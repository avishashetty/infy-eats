import { useRef, useState, useEffect } from 'react';
// import Header from '../../components/Header';
// import Footer from '../../components/Footer';
import { FaUserCircle, FaCamera, FaClipboardList, FaTruck } from 'react-icons/fa';

function Settings() {
  const fileInputRef = useRef(null);
  const storedEmployee = JSON.parse(localStorage.getItem("employee"));
  
  const [name, setName] = useState(storedEmployee?.emp_name || "");
  const [photo, setPhoto] = useState("");
  const [file, setFile] = useState(null);
  const [editing, setEditing] = useState(false);

  const handlePhotoChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = (ev) => setPhoto(ev.target.result);
      reader.readAsDataURL(selectedFile);
    }
  };

  useEffect(() => {
    if (storedEmployee?.emp_id) {
      fetch(`http://localhost:3000/api/employee/${storedEmployee.emp_id}/photo`)
        .then(res => {
          if (res.ok) return res.blob();
          throw new Error("No photo found");
        })
        .then(blob => {
          setPhoto(URL.createObjectURL(blob));
        })
        .catch(() => {});
    }
  }, [storedEmployee?.emp_id]);


  const saveName = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/employee/name", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ empId: storedEmployee.emp_id, name })
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("employee", JSON.stringify(data.user));
        setEditing(false);
        alert("Name updated!");
      } else {
        alert(data.message || "Error updating name");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  const savePhoto = async () => {
    if (!file) return alert("Please select a photo first");

    const formData = new FormData();
    formData.append("empId", storedEmployee.emp_id);
    formData.append("photo", file);

    try {
      const res = await fetch("http://localhost:3000/api/employee/photo", {
        method: "PUT",
        body: formData
      });

      const data = await res.json();
      if (res.ok) {
        alert("Photo updated!");
        setFile(null);
        if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      } else {
        alert(data.message || "Error updating photo");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#261a18] backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-white/90 rounded-2xl shadow-2xl p-8 flex flex-col gap-8 animate-fadeIn">
        
        {/* Close button */}
        <button
          className="absolute top-4 right-4 text-2xl p-2 rounded-full hover:bg-[#a94438]/10 text-[#a94438] focus:outline-none"
          onClick={() => window.history.back()}
          aria-label="Close settings"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-7 h-7">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h1 className="text-3xl font-extrabold text-[#a94438] mb-4 tracking-tight text-center">Settings</h1>

        {/* Profile Photo */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative group">
            {photo ? (
              <img src={photo} alt="Profile" className="h-24 w-24 rounded-full object-cover border-4 border-[#a94438]" />
            ) : (
              <span className="h-24 w-24 flex items-center justify-center rounded-full bg-gray-200 border-4 border-[#a94438] text-5xl text-[#a94438]">
                <FaUserCircle />
              </span>
            )}
            <button
              className="absolute bottom-2 right-2 bg-[#a94438] text-white p-2 rounded-full shadow hover:bg-[#4a3b3b]"
              onClick={() => fileInputRef.current.click()}
              title="Upload Photo"
            >
              <FaCamera />
            </button>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handlePhotoChange}
            />
          </div>
          {file && (
            <button
              className="mt-2 px-3 py-1 rounded bg-[#a94438] text-white font-bold hover:bg-[#4a3b3b]"
              onClick={savePhoto}
            >
              Save Photo
            </button>
          )}

          {/* Name edit */}
          <div className="flex items-center gap-2 mt-2">
            {editing ? (
              <>
                <input
                  className="border border-[#a94438] rounded px-2 py-1 text-[#261a18] font-bold focus:outline-none focus:ring-2 focus:ring-[#a94438]/50"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
                <button
                  className="ml-2 px-3 py-1 rounded bg-[#a94438] text-white font-bold hover:bg-[#4a3b3b]"
                  onClick={saveName}
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <span className="text-xl font-bold text-[#a94438]">{name}</span>
                <button
                  className="ml-2 px-3 py-1 rounded bg-[#a94438] text-white font-bold hover:bg-[#4a3b3b]"
                  onClick={() => setEditing(true)}
                >
                  Edit
                </button>
              </>
            )}
          </div>
        </div>      
      </div>
    </div>
  );
}


export default Settings;
