import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import TextArea from '../../components/TextArea';
import Select from '../../components/Select';

import api from '../../services/api';

import weekDays from '../../options/weekDays';
import subjects from '../../options/subjects';

import warningIcon from '../../assets/icons/warning.svg';

import './styles.css';

const TeacherForm = () => {
    const history = useHistory();

    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [bio, setBio] = useState('');

    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState('');

    const [schedules, setSchedules] = useState([
        { week_day: 0, from: '', to: '' },
    ]);

    function handleAddNewSchedule() {
        setSchedules([
            ...schedules,
            { week_day: 0, from: '', to: '' }
        ]);

    };

    function handleCreateClass(event: FormEvent) {
        event.preventDefault();

        api.post('classes', {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedules
        }).then(() => {
            alert('Cadastro realizado com sucesso!');

            history.push('/');
        }).catch(() => {
            alert('Erro no cadastro!');
        });
    };

    function handleScheduleValue(position: Number, field: string, value: string) {
        const updatedSchedules = schedules.map((schedule, index) => {
            if (index === position) {
                return { ...schedule, [field]: value };
            }

            return schedule;
        });

        setSchedules(updatedSchedules);
    }

    return (
        <div id="page-teacher-form" className="container">
            <PageHeader
                title="Que incrível que você quer dar aulas."
                description="O primeiro passo, é preencher esse formulário de inscrição."
            />

            <main>
                <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>Seus dados</legend>

                        <Input
                            name="name"
                            label="Nome completo"
                            value={name}
                            onChange={event => setName(event.target.value)}
                        />

                        <Input
                            name="avatar"
                            label="Link da sua foto"
                            value={avatar}
                            onChange={event => setAvatar(event.target.value)}
                        />

                        <Input
                            name="whatsapp"
                            label="Whatsapp"
                            value={whatsapp}
                            onChange={event => setWhatsapp(event.target.value)}
                        />

                        <TextArea
                            name="bio"
                            label="Biografia"
                            value={bio}
                            onChange={event => setBio(event.target.value)}
                        />
                    </fieldset>

                    <fieldset>
                        <legend>Sobre a aula</legend>

                        <Select
                            name="subject"
                            label="Matéria"
                            value={subject}
                            onChange={event => setSubject(event.target.value)}
                            options={subjects}
                        />

                        <Input
                            name="cost"
                            label="Custo da sua hora por aula"
                            value={cost}
                            onChange={event => setCost(event.target.value)}
                        />
                    </fieldset>

                    <fieldset>
                        <legend>
                            Horários disponíveis
                            <button type="button" onClick={handleAddNewSchedule}>
                                + Novo horário
                            </button>
                        </legend>

                        {schedules.map((schedule, index) => (
                            <div key={schedule.week_day} className="schedule">
                                <Select
                                    name="week_day"
                                    label="Dia da semana"
                                    value={schedule.week_day}
                                    onChange={event => handleScheduleValue(index, 'week_day', event.target.value)}
                                    options={weekDays}
                                />
                                <Input
                                    name="from"
                                    label="Das"
                                    type="time"
                                    value={schedule.from}
                                    onChange={event => handleScheduleValue(index, 'from', event.target.value)}
                                />
                                <Input
                                    name="to"
                                    label="Até"
                                    type="time"
                                    value={schedule.to}
                                    onChange={event => handleScheduleValue(index, 'to', event.target.value)}
                                />
                            </div>
                        ))}
                    </fieldset>

                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso" />
                            Importante! <br />
                            Preencha todos os dados
                        </p>
                        <button type="submit">
                            Salvar cadastro
                        </button>
                    </footer>
                </form>
            </main>
        </div>
    );
};

export default TeacherForm;
