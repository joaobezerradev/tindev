import React, { useState } from 'react';

import PropTypes from 'prop-types';
import logo from '../../assets/logo.svg';
import { Container } from './styles';

import api from '../../services/api';

interface ITindev {
  _id: String;
  name: String;
  user: String;
  bio: String;
  avatar: String;
}

export default function Login({ history }) {
  const [username, setUsername] = useState<string>('');

  async function handleSubmit(e: React.SyntheticEvent<EventTarget>) {
    e.preventDefault();

    const response = await api.post<ITindev>('/devs', { username });

    const { _id } = response.data;

    history.push(`/dev/${_id}`);
  }


  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <img src={logo} alt="Tindev" />
        <input type="text" placeholder="Digite seu usuario" value={username} onChange={(e) => setUsername(e.target.value)} />
        <button type="submit">Enviar</button>
      </form>
    </Container>
  );
}
Login.propTypes = {
  history: PropTypes.object.isRequired,
};
