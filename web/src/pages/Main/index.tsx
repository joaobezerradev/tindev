import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import logo from '../../assets/logo.svg';
import like from '../../assets/like.svg';
import dislike from '../../assets/dislike.svg';
import { Container } from './styles';
import api from '../../services/api';

interface IUser {
  _id: string;
  name: string;
  user: string;
  bio: string;
  avatar: string;
}

export default function Main({ match }) {
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    async function loadDevs(): Promise<any> {
      const response = await api.get<IUser[]>('/devs', {
        headers: {
          user: match.params.id,
        },
      });
      setUsers(response.data);
    }
    loadDevs();
  }, [match.params.id]);

  async function handleLike(id: string): Promise<any> {
    await api.post(`/devs/${id}/likes`, null, {
      headers: { user: match.params.id },
    });

    setUsers(users.filter((user) => user._id !== id));
  }
  async function handleDislike(id: string): Promise<any> {
    await api.post(`/devs/${id}/dislikes`, null, {
      headers: { user: match.params.id },
    });

    setUsers(users.filter((user) => user._id !== id));
  }
  return (
    <Container>
      <Link to="/">
        <img src={logo} alt="Tindev" />
      </Link>
      {users.length > 0
        ? (
          <ul>
            {users.map((user) => (
              <li key={user._id}>
                <img src={user.avatar} alt={user.user} />
                <footer>
                  <strong>{user.name}</strong>
                  <p>{user.bio}</p>
                </footer>
                <div>
                  <button type="button" onClick={() => handleDislike(user._id)}>
                    <img src={dislike} alt="dislike" />
                  </button>
                  <button type="button" onClick={() => handleLike(user._id)}>
                    <img src={like} alt="like" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div>Acabou :(</div>
        )}
    </Container>
  );
}
Main.propType = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.object.isRequired,
    }),
  }),
};
