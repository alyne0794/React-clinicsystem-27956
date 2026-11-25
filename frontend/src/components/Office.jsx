import { useState } from 'react'
import axios from 'axios'
import LibraryButton from './LibraryButton'

const API = 'http://localhost:8083/api/offices'

function Office({ onChange }) {
  const [officeName, setOfficeName] = useState('')
  const [officeNumber, setOfficeNumber] = useState('')
  const [offNumber, setOffNumber] = useState('')

  async function saveOffice() {
    try {
      const response = await axios.post(API, {
        name: officeName,
        roomNumber: officeNumber,
      })
      alert(response.data.message || 'The office is saved successful')
      onChange?.()
    } catch (err) {
      alert(err.response?.data?.message || 'The office not saved: ' + err.message)
    }
  }

  async function deleteOffice() {
    try {
      // this backend deletes by id, so find the office by its number first
      const list = await axios.get(API)
      const target = list.data.find(
        (o) => String(o.roomNumber) === offNumber.trim()
      )
      if (!target) {
        alert('Office not found')
        return
      }
      const response = await axios.delete(`${API}/${target.id}`)
      alert(response.data.message || 'The office is deleted successful')
      onChange?.()
    } catch (err) {
      alert(err.response?.data?.message || 'The office not deleted: ' + err.message)
    }
  }

  return (
    <div>
      <h1>Save Office</h1>
      <label>Office Name:</label>{' '}
      <input type="text" onChange={e => setOfficeName(e.target.value)} />
      <br />
      <label>Office Number:</label>{' '}
      <input type="text" onChange={e => setOfficeNumber(e.target.value)} />
      <br />
      <LibraryButton buttonLabel="Save" onClickButton={saveOffice} />
      <h1>Delete Office</h1>
      <label>Office Number:</label>{' '}
      <input type="text" onChange={e => setOffNumber(e.target.value)} />
      <br />
      <LibraryButton buttonLabel="Delete" onClickButton={deleteOffice} />
    </div>
  )
}

export default Office