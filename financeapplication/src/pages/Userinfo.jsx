import React, { use, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Userinfo = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [gender, setGender] = useState('');
  const [date, setDate] = useState();

  const handleProfileSubmit = () => {
    if (!name || !surname || !gender || !date) {
      alert('Please fill all the details');
      return;
    }
    localStorage.setItem(
      "userProfile", JSON.stringify({
        name,
        surname,
        gender,
        date
      })
    )
    alert('Your submitted successfully');
    navigate('/');
  }

  const handleLogOut = () => {
    alert("Are you sure your entire profile will be deleted");
    localStorage.removeItem("userProfile");
    localStorage.clear();
    navigate('/');
  }

  const isProfileComplete = () => {
    const profile = JSON.parse(localStorage.getItem("userProfile"));

    return (
      profile?.name &&
      profile?.surname &&
      profile?.gender &&
      profile?.date
    )
  }

  const userName = () => {
    const profile = JSON.parse(localStorage.getItem("userProfile"));
    return profile?.name || "";
  }

  return (
    <div className='flex flex-col gap-6 items-center justify-center'>
      {isProfileComplete() ? <div>Hello {userName()}</div> :
        <div className='flex flex-col items-center justify-center h-96 w-144 rounded-lg bg-slate-600 p-4 gap-6'>
          <form action="" className='flex flex-col items-start justify-center border border-slate-50 border-2 rounded-lg h-full w-full p-4'>
            <input type="text" placeholder='Enter your name' className='bg-slate-50 h-12 w-full rounded-lg p-2 mt-3' value={name} onChange={(e) => setName(e.target.value)} required />
            <input type="text" placeholder='Enter surname' className='bg-slate-50 h-12 w-full rounded-lg p-2 mt-3' value={surname} onChange={(e) => setSurname(e.target.value)} required />
            <select name="" id="" className='bg-slate-50 h-12 w-full rounded-lg p-2 mt-3' value={gender} onChange={(e) => setGender(e.target.value)} required>
              <option value="Gender">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <small className='text-slate-50 font-medium mb-1 px-1'>Enter your date of birth</small>
            <input value={date} onChange={(e) => setDate(e.target.value)} type="date" className='bg-slate-50 h-12 w-full rounded-lg p-2' placeholder='Enter your date of birth..' />
            <button onClick={handleProfileSubmit} className='bg-blue-500 text-slate-50 text-md font-semibold rounded-lg h-12 w-full mt-3 hover:bg-blue-400'>Save</button>
          </form>
        </div>
      }
      <button onClick={handleLogOut} className='h-12 w-144 rounded-lg bg-red-400 text-center text-slate-50 font-semibold text-lg'>Logout</button>
    </div>
  )
}

export default Userinfo