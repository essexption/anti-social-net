import { useEffect, useState } from "react";
import PostPreview from "../components/Home/postPreview";
import TypeOfFeed from "../components/Home/TypeOfFeed";
import MakeAPost from "../components/Home/MakeAPost/MakeAPost";
import AsideNav from "../components/AsideNav/AsideNav";
import { useAuth } from '../context/AuthContext';

function Home() {
  const [posts, setPosts] = useState([]);
  const {usuario, logout} = useAuth();
  //const [loadedPosts, setLoadedPosts] = useState([]);

  const cargarPosts = async () => {
    try {
      const response = await fetch("http://localhost:3000/post");
      if (!response.ok) {
        throw new Error("Error de red");
      }
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error al cargar posts:", error);
    }
  };

  /*
  const AleatoryPosts = () => {
    const shuffledPost = [...posts].sort(() => Math.random() - 0.5);
    if (loadedPosts.length > 0) {
      shuffledPost.filter(post => !loadedPosts.includes(post._id));
      console.log("Posts ya cargados:", loadedPosts);
    }
    const toLoad = shuffledPost.slice(0, 2); // Toma los primeros 10 posts aleatorios
    setLoadedPosts((prev) => [...prev, ...toLoad.map(post => post._id)]); // Agrega los IDs de los posts cargados

    return toLoad; // Retorna 10 posts aleatorios
  }*/

  // Detecta cuando el usuario llega al final de la página
  useEffect(() => {
  const handleScroll = () => {
    const bottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 50;

    if (bottom) {
      console.log("Llegaste al final");
      // Aquí podés cargar más posts, por ejemplo
      }
  };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    cargarPosts();
  }, []);

  useEffect(() => {
  if (usuario) {
    //console.log("Usuario cargado correctamente:", usuario);
  }
}, [usuario]); // ✅ ahora se ejecuta cuando cambia `usuario`

  return (
    <div className="d-flex flex-row gap-3">
        <button onClick={logout}></button>
        <p>{usuario.nickname}</p>
        <div>
          <TypeOfFeed />
          <MakeAPost/>
          <div>
            {posts.map((post) => (
                <PostPreview
                    key={post._id}
                    user={post.user || "Desconocido"}
                    images={post.image}
                    description={post.description}
                    date={post.upload_date}
                    postId={post._id}
                    tags={post.tag || []}
                />
            ))}
          </div>
        </div>
    </div>
  );
}

export default Home;
