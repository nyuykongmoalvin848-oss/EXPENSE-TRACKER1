import { useState } from 'react'
import { Plus } from 'lucide-react'
import { useCategories } from '../../context/CategoriesContext'

export default function AddCategoryForm () {
  const { addCategory } = useCategories()
  const [name, setName] = useState('')
  const [colour, setColour] = useState('#6b7280')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim()) return
    addCategory(name.trim(), colour)
    setName('')
    setColour('#6b7280')
  }

  return (
    <form className='add-category' onSubmit={handleSubmit}>
      <input type='text' placeholder='New category name' value={name} onChange={(e) => setName(e.target.value)} />
      <input type='color' value={colour} onChange={(e) => setColour(e.target.value)} />
      <button type='submit'><Plus size={16} /></button>
    </form>
  )
}