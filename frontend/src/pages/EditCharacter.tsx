import { useEffect, useState } from 'react'
import { getById, update } from '../api/characterApi'
import type { Character } from '../api/characterApi'
import { getSkins } from '../api/skins'
import type { Skin } from '../api/skins'
import { useParams, useNavigate } from 'react-router-dom'

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '0.75rem 1rem',
  background: 'rgba(13,27,42,0.8)',
  border: '1px solid rgba(57,255,20,0.2)',
  borderRadius: 8, color: '#c8f0d0',
  fontFamily: 'Exo 2, sans-serif', fontSize: '0.9rem',
  outline: 'none', transition: 'border-color 0.2s',
}

export default function EditCharacter() {
  const { id } = useParams<{ id: string }>()
  const [form, setForm] = useState<Character>({
    name: '', species: '', status: '', origin: '', imageName: '', imageData: ''
  })
  const [skins, setSkins] = useState<Skin[]>([])
  const [loadingSkins, setLoadingSkins] = useState(true)
  const [selectedSkin, setSelectedSkin] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    getSkins()
      .then(res => setSkins(res.data))
      .finally(() => setLoadingSkins(false))
  }, [])

  useEffect(() => {
    if (!id) return
    getById(Number(id)).then(res => {
      setForm(res.data)
      setSelectedSkin(res.data.imageName || null)
    })
  }, [id])

  const handleSkinSelect = (skin: Skin) => {
    setSelectedSkin(skin.skinId)
    setForm(f => ({ ...f, imageName: skin.skinId, imageData: skin.imageData }))
  }

  const handleSubmit = async () => {
    if (id) {
      await update(Number(id), form)
      navigate('/')
    }
  }

  return (
    <div style={{ maxWidth: 700, margin: '0 auto', animation: 'fadeUp 0.4s ease' }}>
      <h1 style={{
        fontFamily: 'Orbitron, sans-serif',
        fontSize: 'clamp(1.2rem, 3vw, 2rem)',
        fontWeight: 900, color: '#00e5ff',
        textShadow: '0 0 30px rgba(0,229,255,0.4)',
        letterSpacing: '0.05em', marginBottom: '0.5rem',
      }}>
        EDITAR PERSONAGEM
      </h1>
      <p style={{ color: 'rgba(200,240,208,0.4)', marginBottom: '2rem', fontSize: '0.85rem' }}>
        Modifique os dados deste ser interdimensional ou troque a skin no multiverso
      </p>

      <div style={{
        background: 'rgba(13,27,42,0.6)',
        border: '1px solid rgba(0,229,255,0.15)',
        borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem',
      }}>
        <p style={{ fontFamily: 'Orbitron', fontSize: '0.7rem', letterSpacing: '0.15em', color: 'rgba(0,229,255,0.7)', marginBottom: '1rem' }}>
          SELECIONE UMA SKIN
        </p>
        {loadingSkins ? (
          <p style={{ color: 'rgba(0,229,255,0.4)', fontFamily: 'Orbitron', fontSize: '0.7rem', letterSpacing: '0.1em' }}>
            CARREGANDO SKINS...
          </p>
        ) : (
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {skins.map(skin => (
              <div key={skin.skinId} onClick={() => handleSkinSelect(skin)} style={{
                cursor: 'pointer', borderRadius: 10, overflow: 'hidden',
                border: selectedSkin === skin.skinId
                  ? '2px solid #00e5ff'
                  : '2px solid rgba(0,229,255,0.1)',
                boxShadow: selectedSkin === skin.skinId
                  ? '0 0 20px rgba(0,229,255,0.3)'
                  : 'none',
                transition: 'all 0.2s',
                width: 200,
              }}>
                <img
                  src={skin.imageData}
                  alt={skin.label}
                  style={{ width: '100%', aspectRatio: '1', objectFit: 'cover', display: 'block' }}
                />
                <div style={{
                  background: selectedSkin === skin.skinId ? 'rgba(0,229,255,0.15)' : 'rgba(13,27,42,0.9)',
                  padding: '0.4rem', textAlign: 'center',
                  fontFamily: 'Orbitron', fontSize: '0.55rem', letterSpacing: '0.05em',
                  color: selectedSkin === skin.skinId ? '#00e5ff' : 'rgba(200,240,208,0.5)',
                }}>
                  {skin.label.toUpperCase()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{
        background: 'rgba(13,27,42,0.6)',
        border: '1px solid rgba(0,229,255,0.15)',
        borderRadius: 12, padding: '1.5rem',
        display: 'flex', flexDirection: 'column', gap: '1rem',
      }}>
        <div>
          <label style={{ fontSize: '0.75rem', color: 'rgba(200,240,208,0.5)', display: 'block', marginBottom: '0.4rem' }}>NOME</label>
          <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={inputStyle}
            onFocus={e => e.target.style.borderColor = 'rgba(0,229,255,0.6)'}
            onBlur={e => e.target.style.borderColor = 'rgba(57,255,20,0.2)'} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ fontSize: '0.75rem', color: 'rgba(200,240,208,0.5)', display: 'block', marginBottom: '0.4rem' }}>ESPÉCIE</label>
            <select value={form.species} onChange={e => setForm({ ...form, species: e.target.value })} style={{ ...inputStyle, cursor: 'pointer' }}>
              {['Human','Alien','Robot','Humanoid','Animal','Cronenberg','Unknown'].map(s => (
                <option key={s} style={{ background: '#0d1b2a' }}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={{ fontSize: '0.75rem', color: 'rgba(200,240,208,0.5)', display: 'block', marginBottom: '0.4rem' }}>STATUS</label>
            <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} style={{ ...inputStyle, cursor: 'pointer' }}>
              {['Alive','Dead','Unknown'].map(s => <option key={s} style={{ background: '#0d1b2a' }}>{s}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label style={{ fontSize: '0.75rem', color: 'rgba(200,240,208,0.5)', display: 'block', marginBottom: '0.4rem' }}>ORIGEM</label>
          <input value={form.origin} onChange={e => setForm({ ...form, origin: e.target.value })} style={inputStyle}
            onFocus={e => e.target.style.borderColor = 'rgba(0,229,255,0.6)'}
            onBlur={e => e.target.style.borderColor = 'rgba(57,255,20,0.2)'} />
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
          <button onClick={() => navigate('/')} style={{
            flex: 1, padding: '0.9rem',
            background: 'transparent',
            border: '1px solid rgba(200,240,208,0.2)',
            borderRadius: 8, color: 'rgba(200,240,208,0.5)',
            fontFamily: 'Orbitron', fontSize: '0.75rem',
            letterSpacing: '0.1em', cursor: 'pointer',
          }}>
            CANCELAR
          </button>
          <button onClick={handleSubmit} style={{
            flex: 2, padding: '0.9rem',
            background: 'rgba(0,229,255,0.12)',
            border: '1px solid rgba(0,229,255,0.4)',
            borderRadius: 8, color: '#00e5ff',
            fontFamily: 'Orbitron', fontSize: '0.8rem',
            fontWeight: 700, letterSpacing: '0.15em',
            cursor: 'pointer',
            boxShadow: '0 0 20px rgba(0,229,255,0.1)',
          }}>
            ⬡ SALVAR ALTERAÇÕES
          </button>
        </div>
      </div>
    </div>
  )
}