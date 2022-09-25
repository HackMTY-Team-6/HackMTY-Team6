import React from 'react'
import { Formik, Form, Field } from 'formik';
import { Navigate, useNavigate } from 'react-router-dom';

interface Values {
    edad: number;
    peso: number;
    vih: string,
    hepatitis_b: string,
    hepatitis_c: string,
    alergias: string,
    tiempo: string
}

const Donar = () => {

    const navigate = useNavigate()

    const handleSubmit = (values: Values) => {
        console.log(values)
        if (values.edad < 18 || values.edad > 65 || values.peso < 50 || values.vih || values.hepatitis_b || values.hepatitis_c || values.alergias != "no alergico" || values.tiempo != "no tiempo") {
            alert("No cumples con las caracteristicas para ser donante")
        } else {
            navigate("/feed")
        }
    }

    return (
        <div>
            <div className='bg-slate-100 w-[900px] p-8 mx-auto mt-11 shadow-lg'>
                <p>Agradecemos profundamente tu intrés en donar sangre y potencialmente salvar una vida.
                    Primero es necesario establecer si eres elegible.</p>
                <p>La información del siguiente formulario no la almacenaremos, únicamente retendremos si eres elegible o no.</p>
                <Formik
                    initialValues={{
                        edad: 0,
                        peso: 0,
                        vih: "false",
                        hepatitis_b: "false",
                        hepatitis_c: "false",
                        alergias: "no alergias",
                        tiempo: "no tiempo"
                    }}
                    onSubmit={(values: Values) => {
                        handleSubmit(values);
                    }}
                >
                    <Form>
                        <div className='flex justify-around'>
                            <div className="mt-6">
                                <label className="block" htmlFor="edad">
                                    Edad
                                </label>
                                <Field
                                    type="number"
                                    step="1"
                                    className="p-2 w-full"
                                    id="edad"
                                    name="edad"
                                    placeholder="Edad"
                                />
                            </div>
                            <div className="mt-6">
                                <label className="block" htmlFor="peso">
                                    Peso
                                </label>
                                <Field
                                    type="number"
                                    className="p-2 w-full"
                                    id="peso"
                                    name="peso"
                                    placeholder="Peso"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="mt-6">
                                <label className="block" htmlFor="enfermedades">
                                    ¿Padeces alguna de las siguientes enfermedades?
                                </label>
                                <div className='items-center flex w-[120px] gap-6'>
                                    <label htmlFor="vih">VIH/SIDA</label>
                                    <Field
                                        type="checkbox"
                                        className="p-2"
                                        id="vih"
                                        name="vih"
                                    />
                                </div>
                                <div className='items-center flex w-[200px] gap-3'>
                                    <label htmlFor="hepatitis_b">Hepatitis B</label>
                                    <Field
                                        type="checkbox"
                                        className="p-2"
                                        id="hepatitis_b"
                                        name="hepatitis_b"
                                    />
                                </div>
                                <div className='items-center flex w-[120px] gap-3'>
                                    <label htmlFor="hepatitis_c">Hepatitis C</label>
                                    <Field
                                        type="checkbox"
                                        className="p-2"
                                        id="hepatitis_c"
                                        name="hepatitis_c"
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="mt-4">
                                <label className="block" htmlFor="alergias">
                                    ¿Eres alérgico a algún medicamento?
                                </label>
                                <Field
                                    className="p-2 w-full"
                                    as="select"
                                    id="alergias"
                                    name="alergias"
                                >
                                    <option value="" disabled selected>Select your option</option>
                                    <option value="alergico">Si</option>
                                    <option value="no alergico">No</option>
                                </Field>
                            </div>
                        </div>

                        <div>
                            <div className="mt-4">
                                <label className="block" htmlFor="tiempo">
                                    Si usted ha donado sangre, ¿Ha pasado más de ocho semanas desde su última donación?
                                </label>
                                <Field
                                    className="p-2 w-full"
                                    as="select"
                                    id="tiempo"
                                    name="tiempo"
                                >
                                    <option value="" disabled selected>Select your option</option>
                                    <option value="tiempo">Si</option>
                                    <option value="no tiempo">No</option>
                                </Field>
                            </div>
                        </div>


                        <div>
                            <div className="bg-red-400 w-fit px-10 py-2 m-auto mt-5 rounded-md transform transition duration-500 hover:scale-110 shadow-md">
                                <button
                                    className=" text-white font-medium "
                                    type="submit"
                                >
                                    Confirmar
                                </button>
                            </div>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    )
}

export default Donar