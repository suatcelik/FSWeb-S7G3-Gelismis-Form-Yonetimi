import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Form from "./components/Form";
import "./App.css";

function App() {
  const initialMembers = [
    {
      isim: "Emre",
      email: "emre@workintech.com.tr",
      sifre: "pass123",
      kvkk: true,
    },
    {
      isim: "Ömer",
      email: "omer@workintech.com.tr",
      sifre: "pass123",
      kvkk: true,
    },
    {
      isim: "Erhan",
      email: "erhan@workintech.com.tr",
      sifre: "pass123",
      kvkk: true,
    },
  ];
  const [members, setMembers] = useState(initialMembers);
  const [editingMember, setEditingMember] = useState(null);

  const addMemberToTheTeam = (memberObj) => {
    // yeni bir array açıyorum. [] -> boş array
    // spread ile members array'ini yeni array'e kopyalıoyorum. [...members]
    // yeni array'e yeni üyeyi ekliyorum. [...members, member]
    setMembers([...members, memberObj]);
  };

  const updateMemberToTheTeam = (memberUpdatedObj) => {
    const updatedMembersArray = members.map((m) => {
      if (m.email === editingMember.email) {
        return memberUpdatedObj;
      } else {
        return m;
      }
    });
    setEditingMember(null);
    setMembers(updatedMembersArray);
  };
  return (
    <>
      <div className="block w-full">
        <img
          className="h-10 relative -left-12 mb-6 dark:grayscale dark:invert"
          src="https://workintech.com.tr/assets/logo-light-c0bded94.svg"
          alt="Workintech Logo"
        />
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
          Üye Kayıt Formu
        </h1>
        {members.length > 0 && (
          <div className="my-6 block">
            {members.map((member, i) => (
              <div
                key={i}
                className="mt-2 flex items-center justify-between gap-x-3"
              >
                <svg
                  className="h-12 w-12 text-gray-300"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <p className="text-base font-semibold leading-7 text-gray-900 dark:text-gray-100 dark: text-gray-50 text-left">
                  {member.isim}
                </p>
                {member.email}
                <button
                  type="button"
                  className="text-xs font-semibold leading-6  text-gray-900 dark:text-gray-100 ml-4"
                  onClick={() => setEditingMember(member)}
                >
                  Düzenle
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <Form
        addMember={addMemberToTheTeam}
        editMember={updateMemberToTheTeam}
        duzenlenecekUye={editingMember}
      />
    </>
  );
}

export default App;
