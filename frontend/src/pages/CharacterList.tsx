import { useEffect, useState } from 'react'
import { getAll, remove } from '../api/characterApi'
import type { Character } from '../api/characterApi'
import { useNavigate } from 'react-router-dom'

export default function CharacterList() {
  const [characters, setCharacters] = useState<Character[]>([])
  const navigate = useNavigate()

  const load = async () => {
    const res = await getAll()
    setCharacters(res.data)
  }

  useEffect(() => { load() }, [])

  const handleDelete = async (id: number) => {
    if (window.confirm('Deletar este personagem do multiverso?')) {
      try {
        await remove(id)
        setCharacters(prev => prev.filter(c => c.id !== id))
      } catch (err) {
        console.error('Erro ao deletar:', err)
        alert('Erro ao deletar. Verifique se o backend está rodando.')
      }
    }
  }

  const statusColor: Record<string, string> = {
    Alive: '#39ff14', Dead: '#ff4444', Unknown: '#888'
  }

  return (
    <div>
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{
          fontFamily: 'Orbitron, sans-serif',
          fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
          fontWeight: 900,
          color: '#39ff14',
          textShadow: '0 0 30px rgba(57,255,20,0.4)',
          letterSpacing: '0.05em',
          marginBottom: '0.5rem',
        }}>
          MULTIVERSO
        </h1>
        <p style={{ color: 'rgba(200,240,208,0.4)', fontFamily: 'Exo 2', fontSize: '0.9rem' }}>
          {characters.length} {characters.length === 1 ? 'personagem registrado' : 'personagens registrados'} na base de dados
        </p>
      </div>

      {characters.length === 0 ? (
        <div style={{
          textAlign: 'center', padding: '5rem 2rem',
          border: '1px dashed rgba(57,255,20,0.2)',
          borderRadius: 16,
          color: 'rgba(200,240,208,0.3)',
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⬡</div>
          <p style={{ fontFamily: 'Orbitron', fontSize: '0.85rem', letterSpacing: '0.1em' }}>
            NENHUM PERSONAGEM CRIADO
          </p>
          <p style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>
            Crie seu primeiro personagem para popular o multiverso
          </p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '1.5rem',
        }}>
          {characters.map((c, i) => (
            <div key={c.id} style={{
              background: 'rgba(13, 27, 42, 0.9)',
              border: '1px solid rgba(57, 255, 20, 0.15)',
              borderRadius: 12,
              overflow: 'hidden',
              animation: `fadeUp 0.4s ease ${i * 0.07}s both`,
              transition: 'transform 0.2s, border-color 0.2s, box-shadow 0.2s',
              cursor: 'default',
            }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)'
                ;(e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(57,255,20,0.5)'
                ;(e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 32px rgba(57,255,20,0.1)'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'
                ;(e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(57,255,20,0.15)'
                ;(e.currentTarget as HTMLDivElement).style.boxShadow = 'none'
              }}
            >
              <div style={{ position: 'relative', aspectRatio: '1', overflow: 'hidden', background: '#0a1520' }}>
                {c.imageData ? (
                  <img src={c.imageData} alt={c.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center', color: 'rgba(57,255,20,0.2)', fontSize: '3rem' }}>⬡</div>
                )}
                <div style={{
                  position: 'absolute', top: 10, right: 10,
                  background: 'rgba(6,11,16,0.85)',
                  border: `1px solid ${statusColor[c.status] || '#888'}`,
                  borderRadius: 20, padding: '2px 10px',
                  display: 'flex', alignItems: 'center', gap: 6,
                  fontSize: '0.7rem', fontFamily: 'Orbitron', color: statusColor[c.status] || '#888',
                }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: statusColor[c.status] || '#888', display: 'inline-block' }} />
                  {c.status}
                </div>
              </div>

              <div style={{ padding: '1rem' }}>
                <h3 style={{
                  fontFamily: 'Orbitron, sans-serif',
                  fontSize: '0.9rem', fontWeight: 700,
                  color: '#e8ffe8', marginBottom: '0.5rem',
                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                }}>
                  {c.name}
                </h3>
                <p style={{ fontSize: '0.75rem', color: 'rgba(200,240,208,0.5)', marginBottom: '0.25rem' }}>
                  🧬 {c.species}
                </p>
                <p style={{ fontSize: '0.75rem', color: 'rgba(200,240,208,0.4)', marginBottom: '1rem' }}>
                  📍 {c.origin}
                </p>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button onClick={() => navigate(`/edit/${c.id}`)} style={{
                    flex: 1, padding: '0.5rem',
                    background: 'rgba(57,255,20,0.08)',
                    border: '1px solid rgba(57,255,20,0.3)',
                    borderRadius: 6, color: '#39ff14',
                    fontFamily: 'Orbitron', fontSize: '0.65rem',
                    letterSpacing: '0.05em', cursor: 'pointer',
                    transition: 'background 0.2s',
                  }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(57,255,20,0.18)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'rgba(57,255,20,0.08)')}
                  >
                    EDITAR
                  </button>
                  <button onClick={() => handleDelete(c.id!)} style={{
                    flex: 1, padding: '0.5rem',
                    background: 'rgba(255,68,68,0.08)',
                    border: '1px solid rgba(255,68,68,0.3)',
                    borderRadius: 6, color: '#ff4444',
                    fontFamily: 'Orbitron', fontSize: '0.65rem',
                    letterSpacing: '0.05em', cursor: 'pointer',
                    transition: 'background 0.2s',
                  }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,68,68,0.18)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,68,68,0.08)')}
                  >
                    DELETAR
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}