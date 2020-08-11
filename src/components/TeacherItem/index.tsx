import React from 'react';

import whatsappIcon from '../../assets/icons/whatsapp.svg';

import api from '../../services/api';

import './styles.css';

export interface Teacher {
    id: number;
    name: string;
    avatar: string;
    bio: string;
    whatsapp: string;
    subject: string;
    cost: number;

};

interface TeacherItemProps {
    teacher: Teacher;
};

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher }) => {
    function handleCreateNewConnection() {
        api.post('connections', {
            user_id: teacher.id,
        });
    }

    return (
        <article className="teacher-item">
            <header>
                <img src={teacher.avatar} alt={teacher.name} />
                <div>
                    <strong>{teacher.name}</strong>
                    <span>{teacher.subject}</span>
                </div>
            </header>

            <p>{teacher.bio}</p>

            <footer>
                <p>
                    Preço/hora
                    <strong>R$ {teacher.cost}</strong>
                </p>
                <a
                    target="_blank"
                    onClick={handleCreateNewConnection}
                    href={`https://wa.me/${teacher.whatsapp}`}
                    rel="noopener noreferrer"
                >
                    <img src={whatsappIcon} alt="Whatsapp" />
                    Entrar em contato
                </a>
            </footer>
        </article>
    );
};

export default TeacherItem;
