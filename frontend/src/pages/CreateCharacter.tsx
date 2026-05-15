import { useState, useEffect, useRef } from 'react'
import { create } from '../api/characterApi'
import type { Character } from '../api/characterApi'
import { getSkins, createSkin } from '../api/skins'
import type { Skin } from '../api/skins'
import { useNavigate } from 'react-router-dom'

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '0.75rem 1rem',
  background: 'rgba(13,27,42,0.8)',
  border: '1px solid rgba(57,255,20,0.2)',
  borderRadius: 8, color: '#c8f0d0',
  fontFamily: 'Exo 2, sans-serif', fontSize: '0.9rem',
  outline: 'none', transition: 'border-color 0.2s',
}

export default function CreateCharacter() {
  const [form, setForm] = useState<Character>({
    name: '', species: 'Human', status: 'Alive', origin: '', imageName: '', imageData: ''
  })
  const [skins, setSkins] = useState<Skin[]>([])
  const [selectedSkin, setSelectedSkin] = useState<string | null>(null)
  const [uploadPreview, setUploadPreview] = useState<string | null>(null)
  const [uploadBase64, setUploadBase64] = useState<string | null>(null)
  const [skinLabel, setSkinLabel] = useState('')
  const [savingSkin, setSavingSkin] = useState(false)
  const [skinSaved, setSkinSaved] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loadingSkins, setLoadingSkins] = useState(true)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    getSkins()
      .then(res => setSkins(res.data))
      .finally(() => setLoadingSkins(false))
  }, [])

  const handleSkinSelect = (skin: Skin) => {
    setSelectedSkin(skin.skinId)
    setUploadPreview(null)
    setUploadBase64(null)
    setSkinLabel('')
    setSkinSaved(false)
    setForm(f => ({ ...f, imageName: skin.skinId, imageData: skin.imageData }))
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onloadend = () => {
      const base64 = reader.result as string
      setUploadPreview(base64)
      setUploadBase64(base64)
      setSelectedSkin(null)
      setSkinSaved(false)
      setForm(f => ({ ...f, imageName: '', imageData: '' }))
    }
    reader.readAsDataURL(file)
  }

  const handleSaveSkin = async () => {
    if (!uploadBase64 || !skinLabel.trim()) return
    setSavingSkin(true)
    try {
      const newSkin = await createSkin({ label: skinLabel, imageData: uploadBase64 })
      setSkins(prev => [...prev, newSkin.data])
      setSelectedSkin(newSkin.data.skinId)
      setForm(f => ({ ...f, imageName: newSkin.data.skinId, imageData: newSkin.data.imageData }))
      setSkinSaved(true)
    } finally {
      setSavingSkin(false)
    }
  }

  const handleRemoveUpload = () => {
    setUploadPreview(null)
    setUploadBase64(null)
    setSkinLabel('')
    setSkinSaved(false)
    setForm(f => ({ ...f, imageName: '', imageData: '' }))
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleSubmit = async () => {
    if (!form.name || !form.origin || !form.imageData) return
    setLoading(true)
    await create(form)
    navigate('/')
  }

  return (
    <div style={{ maxWidth: 700, margin: '0 auto', animation: 'fadeUp 0.4s ease' }}>
      <h1 style={{
        fontFamily: 'Orbitron, sans-serif',
        fontSize: 'clamp(1.2rem, 3vw, 2rem)',
        fontWeight: 900, color: '#39ff14',
        textShadow: '0 0 30px rgba(57,255,20,0.4)',
        letterSpacing: '0.05em', marginBottom: '0.5rem',
      }}>
        CRIAR PERSONAGEM
      </h1>
      <p style={{ color: 'rgba(200,240,208,0.4)', marginBottom: '2rem', fontSize: '0.85rem' }}>
        Escolha uma skin ou faça upload da sua própria imagem
      </p>

      {/* Skin picker */}
      <div style={{
        background: 'rgba(13,27,42,0.6)',
        border: '1px solid rgba(57,255,20,0.15)',
        borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem',
      }}>
        <p style={{ fontFamily: 'Orbitron', fontSize: '0.7rem', letterSpacing: '0.15em', color: 'rgba(57,255,20,0.7)', marginBottom: '1rem' }}>
          SELECIONE UMA SKIN
        </p>

        {loadingSkins ? (
          <p style={{ color: 'rgba(57,255,20,0.4)', fontFamily: 'Orbitron', fontSize: '0.7rem' }}>
            CARREGANDO SKINS...
          </p>
        ) : (
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {skins.map(skin => (
              <div key={skin.skinId} onClick={() => handleSkinSelect(skin)} style={{
                cursor: 'pointer', borderRadius: 10, overflow: 'hidden',
                border: selectedSkin === skin.skinId ? '2px solid #39ff14' : '2px solid rgba(57,255,20,0.1)',
                boxShadow: selectedSkin === skin.skinId ? '0 0 20px rgba(57,255,20,0.3)' : 'none',
                transition: 'all 0.2s', width: 100,
              }}>
                <img src={skin.imageData} alt={skin.label} style={{ width: '100%', aspectRatio: '1', objectFit: 'cover', display: 'block' }} />
                <div style={{
                  background: selectedSkin === skin.skinId ? 'rgba(57,255,20,0.15)' : 'rgba(13,27,42,0.9)',
                  padding: '0.4rem', textAlign: 'center',
                  fontFamily: 'Orbitron', fontSize: '0.55rem', letterSpacing: '0.05em',
                  color: selectedSkin === skin.skinId ? '#39ff14' : 'rgba(200,240,208,0.5)',
                }}>
                  {skin.label.toUpperCase()}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Divisor */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '1.5rem 0 1.25rem' }}>
          <div style={{ flex: 1, height: 1, background: 'rgba(57,255,20,0.1)' }} />
          <span style={{ fontFamily: 'Orbitron', fontSize: '0.65rem', color: 'rgba(57,255,20,0.4)', letterSpacing: '0.15em' }}>OU</span>
          <div style={{ flex: 1, height: 1, background: 'rgba(57,255,20,0.1)' }} />
        </div>

        {/* Upload */}
        <p style={{ fontFamily: 'Orbitron', fontSize: '0.7rem', letterSpacing: '0.15em', color: 'rgba(57,255,20,0.7)', marginBottom: '1rem' }}>
          CRIAR NOVA SKIN
        </p>

        {uploadPreview ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{
                width: 100, borderRadius: 10, overflow: 'hidden',
                border: skinSaved ? '2px solid #39ff14' : '2px solid rgba(57,255,20,0.3)',
                boxShadow: skinSaved ? '0 0 20px rgba(57,255,20,0.3)' : 'none',
              }}>
                <img src={uploadPreview} alt="preview" style={{ width: '100%', aspectRatio: '1', objectFit: 'cover', display: 'block' }} />
                <div style={{
                  background: skinSaved ? 'rgba(57,255,20,0.15)' : 'rgba(13,27,42,0.9)',
                  padding: '0.4rem', textAlign: 'center',
                  fontFamily: 'Orbitron', fontSize: '0.55rem',
                  color: skinSaved ? '#39ff14' : 'rgba(200,240,208,0.5)',
                }}>
                  {skinSaved ? 'SALVA ✓' : 'PREVIEW'}
                </div>
              </div>

              {!skinSaved && (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: 'rgba(200,240,208,0.5)', display: 'block', marginBottom: '0.4rem' }}>
                      NOME DA SKIN
                    </label>
                    <input
                      placeholder="Ex: Meu Personagem Épico"
                      value={skinLabel}
                      onChange={e => setSkinLabel(e.target.value)}
                      style={inputStyle}
                      onFocus={e => e.target.style.borderColor = 'rgba(57,255,20,0.6)'}
                      onBlur={e => e.target.style.borderColor = 'rgba(57,255,20,0.2)'}
                    />
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button onClick={handleSaveSkin} disabled={savingSkin || !skinLabel.trim()} style={{
                      flex: 2, padding: '0.6rem',
                      background: skinLabel.trim() ? 'rgba(57,255,20,0.15)' : 'rgba(57,255,20,0.05)',
                      border: '1px solid rgba(57,255,20,0.4)',
                      borderRadius: 6, color: '#39ff14',
                      fontFamily: 'Orbitron', fontSize: '0.65rem',
                      letterSpacing: '0.08em', cursor: skinLabel.trim() ? 'pointer' : 'not-allowed',
                    }}>
                      {savingSkin ? 'SALVANDO...' : '⬡ SALVAR SKIN'}
                    </button>
                    <button onClick={handleRemoveUpload} style={{
                      flex: 1, padding: '0.6rem',
                      background: 'rgba(255,68,68,0.08)',
                      border: '1px solid rgba(255,68,68,0.3)',
                      borderRadius: 6, color: '#ff4444',
                      fontFamily: 'Orbitron', fontSize: '0.65rem',
                      cursor: 'pointer',
                    }}>
                      REMOVER
                    </button>
                  </div>
                </div>
              )}

              {skinSaved && (
                <div style={{ flex: 1 }}>
                  <p style={{ fontFamily: 'Orbitron', fontSize: '0.7rem', color: '#39ff14', marginBottom: '0.5rem' }}>
                    ✓ SKIN SALVA NO BANCO
                  </p>
                  <p style={{ fontSize: '0.75rem', color: 'rgba(200,240,208,0.4)' }}>
                    A skin "{skinLabel}" foi salva e já está disponível para uso.
                  </p>
                  <button onClick={handleRemoveUpload} style={{
                    marginTop: '0.75rem',
                    padding: '0.5rem 1rem',
                    background: 'transparent',
                    border: '1px solid rgba(200,240,208,0.2)',
                    borderRadius: 6, color: 'rgba(200,240,208,0.4)',
                    fontFamily: 'Orbitron', fontSize: '0.6rem',
                    cursor: 'pointer',
                  }}>
                    USAR OUTRA IMAGEM
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div
            onClick={() => fileInputRef.current?.click()}
            style={{
              border: '2px dashed rgba(57,255,20,0.2)',
              borderRadius: 10, padding: '1.5rem',
              textAlign: 'center', cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(57,255,20,0.5)'
              ;(e.currentTarget as HTMLDivElement).style.background = 'rgba(57,255,20,0.04)'
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(57,255,20,0.2)'
              ;(e.currentTarget as HTMLDivElement).style.background = 'transparent'
            }}
          >
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>📁</div>
            <p style={{ fontFamily: 'Orbitron', fontSize: '0.7rem', color: 'rgba(57,255,20,0.6)', letterSpacing: '0.1em', marginBottom: '0.25rem' }}>
              CLIQUE PARA FAZER UPLOAD
            </p>
            <p style={{ fontSize: '0.75rem', color: 'rgba(200,240,208,0.3)' }}>
              PNG, JPG ou JPEG
            </p>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleUpload}
          style={{ display: 'none' }}
        />
      </div>

      {/* Form */}
      <div style={{
        background: 'rgba(13,27,42,0.6)',
        border: '1px solid rgba(57,255,20,0.15)',
        borderRadius: 12, padding: '1.5rem',
        display: 'flex', flexDirection: 'column', gap: '1rem',
      }}>
        <p style={{ fontFamily: 'Orbitron', fontSize: '0.7rem', letterSpacing: '0.15em', color: 'rgba(57,255,20,0.7)' }}>
          ATRIBUTOS
        </p>

        <div>
          <label style={{ fontSize: '0.75rem', color: 'rgba(200,240,208,0.5)', display: 'block', marginBottom: '0.4rem' }}>NOME DO PERSONAGEM</label>
          <input
            placeholder="Ex: Rick Sanchez C-137"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            style={inputStyle}
            onFocus={e => e.target.style.borderColor = 'rgba(57,255,20,0.6)'}
            onBlur={e => e.target.style.borderColor = 'rgba(57,255,20,0.2)'}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ fontSize: '0.75rem', color: 'rgba(200,240,208,0.5)', display: 'block', marginBottom: '0.4rem' }}>ESPÉCIE</label>
            <select value={form.species} onChange={e => setForm({ ...form, species: e.target.value })} style={{ ...inputStyle, cursor: 'pointer' }}>
              {['Human', 'Alien', 'Humanoid', 'Robot', 'Animal', 'Disease', 'Poopybutthole', 'Mythological Creature', 'Cronenberg', 'Planet', 'Parasite', 'Genetic Experiment', 'Unknown'].map(s => (
                <option key={s} style={{ background: '#0d1b2a' }}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={{ fontSize: '0.75rem', color: 'rgba(200,240,208,0.5)', display: 'block', marginBottom: '0.4rem' }}>STATUS</label>
            <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} style={{ ...inputStyle, cursor: 'pointer' }}>
              {['Alive', 'Dead', 'Unknown'].map(s => <option key={s} style={{ background: '#0d1b2a' }}>{s}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label style={{ fontSize: '0.75rem', color: 'rgba(200,240,208,0.5)', display: 'block', marginBottom: '0.4rem' }}>ORIGEM</label>
          <input
            placeholder="Ex: Earth C-137, Citadel of Ricks..."
            value={form.origin}
            onChange={e => setForm({ ...form, origin: e.target.value })}
            style={inputStyle}
            onFocus={e => e.target.style.borderColor = 'rgba(57,255,20,0.6)'}
            onBlur={e => e.target.style.borderColor = 'rgba(57,255,20,0.2)'}
          />
        </div>

        <button onClick={handleSubmit} disabled={loading} style={{
          padding: '0.9rem',
          background: loading ? 'rgba(57,255,20,0.1)' : 'rgba(57,255,20,0.15)',
          border: '1px solid rgba(57,255,20,0.5)',
          borderRadius: 8, color: '#39ff14',
          fontFamily: 'Orbitron', fontSize: '0.8rem',
          fontWeight: 700, letterSpacing: '0.15em',
          cursor: loading ? 'not-allowed' : 'pointer',
          transition: 'all 0.2s',
          boxShadow: '0 0 20px rgba(57,255,20,0.1)',
          marginTop: '0.5rem',
        }}
          onMouseEnter={e => !loading && ((e.currentTarget.style.background = 'rgba(57,255,20,0.25)'), (e.currentTarget.style.boxShadow = '0 0 30px rgba(57,255,20,0.3)'))}
          onMouseLeave={e => (e.currentTarget.style.background = 'rgba(57,255,20,0.15)', e.currentTarget.style.boxShadow = '0 0 20px rgba(57,255,20,0.1)')}
        >
          {loading ? 'CRIANDO...' : '⬡ CRIAR PERSONAGEM'}
        </button>
      </div>
    </div>
  )
}