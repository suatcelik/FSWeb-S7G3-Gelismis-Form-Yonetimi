import { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";

function Form(props) {
  const { addMember, editMember, duzenlenecekUye } = props;
  const [formErrors, setFormErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [roller, setRoller] = useState(["Frontend", "Backend", "DevOps"]);
  const initialFormData = duzenlenecekUye || {
    isim: "",
    email: "",
    sifre: "",
    kvkk: false,
  };
  const [formData, setFormData] = useState(initialFormData);

  const reset = () => {
    setFormData(initialFormData);
    setFormErrors({});
    setIsFormValid(false);
  };

  useEffect(() => {
    console.log("useEffect çalıştı");
    if (duzenlenecekUye) {
      setFormData(duzenlenecekUye);
    }
  }, [duzenlenecekUye]);

  const myFormSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    if (duzenlenecekUye) {
      axios
        .post("https://reqres.in/api/s7g3", formData)
        .then(function (response) {
          console.log(response);
          // app.js içindeki state'i güncelle
          editMember(response.data);
          reset();
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      axios
        .post("https://reqres.in/api/s7g3", formData)
        .then(function (response) {
          console.log(response);
          // app.js içindeki state'i güncelle
          addMember(response.data);
          reset();
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  let yupSchemaPatron = yup.object({
    isim: yup
      .string()
      .required("İsim zorunludur")
      .min(3, "İsim en az 3 karakter olmalıdır"),
    email: yup
      .string()
      .required("E-posta zorunludur")
      .email("E-posta formatı hatalıdır")
      .notOneOf(["waffle@syrup.com"], "Bu email adresi kullanılıyor"),
    sifre: yup
      .string()
      .required("Şifre zorunludur")
      .min(6, "Şifre en az 6 karakter olmalıdır"),
    kvkk: yup.boolean().oneOf([true], "KVKK onayı zorunludur"),
    rol: yup.string().notOneOf(["-"], "Bir rol olmalıdır"),
  });

  const validateInput = (name, value) => {
    yup
      .reach(yupSchemaPatron, name)
      .validate(value)
      .then((valid) => {
        console.log("validateInput", valid);
        const newErrors = {
          ...formErrors,
          [name]: null,
        };
        setFormErrors(newErrors);
      })
      .catch((err) => {
        console.log(err.name, err.errors);
        const newErrors = {
          ...formErrors,
          [name]: err.errors[0],
        };
        setFormErrors(newErrors);
      });
  };

  const validateForm = (formData) => {
    yupSchemaPatron
      .isValid(formData)
      .then((valid) => {
        console.log("validateForm", valid);
        setIsFormValid(valid);
      })
      .catch((err) => {
        console.log("validateForm", err.name, err.errors);
        console.log(err);
        setIsFormValid(false);
      });
  };

  const myFormChange = (e) => {
    const { name, value, checked, type } = e.target;

    const inputValue = type === "checkbox" ? checked : value;

    const updatedFormData = {
      ...formData,
      [name]: inputValue,
    };

    setFormData(updatedFormData);

    validateInput(name, inputValue);
    validateForm(updatedFormData);
  };

  return (
    <form onSubmit={myFormSubmit} className="mx-auto max-w-5xl">
      <div className="border-b border-gray-900/10 dark: border-gray-100/30 pb-6">
        <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-4">
          <div className="sm:col-span-2 ">
            <label
              htmlFor="f_isim"
              className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100 dark:text-gray-100"
            >
              İsim
            </label>
            <div className="mt-2">
              <input
                value={formData.isim}
                name="isim"
                placeholder="üye adı ve soyadı"
                id="f_isim"
                onChange={myFormChange}
                className="px-2 block w-full rounded-md border-0 min-w-[210px] mb-2 py-1.5 text-gray-900 dark:text-gray-100 dark:text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:text-white"
              />
              {formErrors.isim && (
                <p className="text-red-500 text-sm ">{formErrors.isim}</p>
              )}
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="f_email"
              className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100 dark:text-gray-100"
            >
              Eposta
            </label>
            <div className="mt-2">
              <input
                value={formData.email}
                name="email"
                placeholder="sistem eposta adresi"
                id="f_email"
                onChange={myFormChange}
                className="px-2 block w-full rounded-md border-0 min-w-[210px] mb-2 py-1.5 text-gray-900 dark:text-gray-100 dark:text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:text-white"
              />
              {formErrors.email && (
                <p className="text-red-500 text-sm ">{formErrors.email}</p>
              )}
            </div>
          </div>
          <div className="sm:col-span-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100 dark:text-gray-100">
              Rol
            </label>
            <div className="mt-2">
              <select
                name="rol"
                value={formData.rol}
                onChange={myFormChange}
                class="bg-gray-50 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-500 text-gray-900 dark:text-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option selected>-</option>
                {roller.map((r, i) => (
                  <option key={i} value={r}>
                    {r}
                  </option>
                ))}
              </select>
              {formErrors.rol && (
                <span className="text-red-500 text-sm ml-2">
                  {formErrors.rol}
                </span>
              )}
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="f_sifre"
              className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100 dark:text-gray-100"
            >
              Şifre
            </label>
            <div className="mt-2">
              <input
                type="password"
                value={formData.sifre}
                name="sifre"
                placeholder="sistem şifresi"
                id="f_sifre"
                onChange={myFormChange}
                className="px-2 block w-full rounded-md border-0 min-w-[210px] mb-2 py-1.5 text-gray-900 dark:text-gray-100 dark:text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:text-white"
              />
              {formErrors.sifre && (
                <span className="text-red-500 text-sm ">
                  {formErrors.sifre}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10 ">
        <div className="relative flex gap-x-3">
          <div className="flex h-6 items-center">
            <input
              type="checkbox"
              name="kvkk"
              placeholder="abc"
              id="f_kvkk"
              checked={formData.kvkk}
              onChange={myFormChange}
              className="h-4 w-4 rounded border-gray-300 dark:border-gray-700  text-indigo-600 focus:ring-indigo-600"
            />
          </div>
          <div className="text-sm leading-6">
            <label
              htmlFor="f_kvkk"
              className="font-medium  text-gray-900 dark:text-gray-100 dark:text-gray-100"
            >
              Kullanım koşulları
            </label>
            {formErrors.kvkk && (
              <span className="text-red-500 text-sm ml-2">
                {formErrors.kvkk}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          onClick={reset}
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100 dark:text-gray-100"
        >
          Vazgeç
        </button>
        <button
          disabled={!isFormValid}
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:hover:bg-indigo-600"
        >
          Gönder
        </button>
      </div>
    </form>
  );
}

export default Form;
