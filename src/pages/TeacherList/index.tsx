import React, { useState, FormEvent } from 'react';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';

import api from '../../services/api';

import subjects from '../../options/subjects';
import weekDays from '../../options/weekDays';

import './styles.css';

const TeacherList = () => {
    const [teachers, setTeachers] = useState([]);

    const [subject, setSubject] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('');

    async function handleSearchTeachers(event: FormEvent) {
        event.preventDefault();

        const response = await api.get('classes', {
            params: { subject, week_day, time },
        });

        setTeachers(response.data);
    };

    return (
        <div id="page-teacher-list" className="container">
            <PageHeader title="Estes são os proffys disponíveis.">
                <form id="search-teachers" onSubmit={handleSearchTeachers}>
                    <Select
                        name="subject"
                        label="Matéria"
                        value={subject}
                        onChange={event => setSubject(event.target.value)}
                        options={subjects}
                    />
                    <Select
                        name="week_day"
                        label="Dia da semana"
                        value={week_day}
                        onChange={event => setWeekDay(event.target.value)}
                        options={weekDays}
                    />
                    <Input
                        type="time"
                        name="time"
                        label="Hora"
                        value={time}
                        onChange={event => setTime(event.target.value)}
                    />
                    <button type="submit">
                        Buscar
                    </button>
                </form>
            </PageHeader>

            <main>
                {teachers.map((teacher: Teacher) =>
                    <TeacherItem key={teacher.id} teacher={teacher} />
                )}
            </main>
        </div>
    );
};

export default TeacherList;
