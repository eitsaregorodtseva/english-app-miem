import axios from 'axios';
import { useRef, useState } from 'react';
import Select from 'react-select';
import { Form, Input, Button } from 'reactstrap';
import toast, { Toaster } from 'react-hot-toast';
import '../style.css';

const options = [
    { value: "картинка", label: "картинка" },
    { value: "звук", label: "звук" },
    { value: "видео", label: "видео" }
]

const postMediaUrl = 'https://api.unolingua.flareon.ru/mediafiles/';

export default function Modal({ handleClose, show }) {
    const showHideClassName = show ? "modal display-block" : "modal display-none";
    const [type_med, setTypeMed] = useState("");
    const [med, setMed] = useState("");

    const inputRef = useRef();
    const handleChange = (e) => {
        if (e.value) {
            setTypeMed(e.value)
        }
        else {
            setMed(e.target.files[0]);
        }
    }
    const handleSubmitModal = (e) => {
        e.preventDefault();
        if (med && type_med) {
            let form_data = new FormData();
            form_data.append("link_med", med);
            form_data.append("type", type_med);
            form_data.append("lexeme", "");

            axios.post(postMediaUrl, form_data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((res) => {
                console.log(res);
                if (res.status === 201) {
                    toast.success("Медиафайл успешно добавлен.");
                    setTypeMed("");
                    setMed("");
                    inputRef.current.value = "";
                }
            })
            .catch((error) => {
                console.log(error.response);
                toast.error("Не удалось добавить медиафайл.");
                setTypeMed("");
                setMed("");
                inputRef.current.value = "";
            });
        }
    }

    return (
        <div className={showHideClassName}>
            <div className="modal-main">
                <button type="button" onClick={handleClose}>
                    Close
                </button>
                <Form>
                    <Input type="file" name="mediafile" onChange={handleChange} ref={inputRef} required></Input>
                    <Select
                        options={options}
                        value={options.filter(med => med.value === type_med)}
                        className="basic-single"
                        classNamePrefix="select"
                        onChange={handleChange}
                        placeholder="Выберите тип файла"
                        required>
                    </Select>
                    <Button onClick={handleSubmitModal}>Загрузить</Button>
                </Form>
            </div>
            <Toaster position="bottom-right" />
        </div >
    );
}
