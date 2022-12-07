import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { Link,  useNavigate } from "react-router-dom";
import PostDetail from "../../components/PostDetail.js/PostDetail";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import "./styles.css";
const Home = () => {
  const [query, setQuery] = useState("");
  const {documents: posts, loading} = useFetchDocuments("posts")
  const navigate = useNavigate();
 
  const handleSubmit = (e) => {
    e.preventDefault();

    if(query) {
      return navigate(`/search?q=${query}`)
    }
  };
  return (
    <div className="home">
      <h1>Veja os nossos posts mais recentes</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="busque por tags..."
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn-dark">
          <AiOutlineSearch color="#fff" size={20} />
        </button>
      </form>
      <div>
        {loading &&<p>Carregando...</p>}
        {posts && posts.map((post) => <PostDetail key={post.id} post={post}/>)}
        {posts && posts.length === 0 && (
          <div className="noposts">
            <p>Não foram encontrados posts :( </p>
            <Link to="/Post/create">Criar primeiro post</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
