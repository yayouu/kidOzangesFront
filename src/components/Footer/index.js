import './styles.css';
export default function Footer(){
    return(
        <footer>
            <div className="footer--container">
            <h2>  Le portail de recherche d'activités ludiques pour enfants</h2>
            <nav className="footer--nav">
            <a href="mailto:kidozanges@gmail.com"> Nous contacter </a>
            <a href="/aboutus">A propos</a>
            <a href="/LegalNotice">Mention légales</a>
            </nav>
            </div>
        </footer>
    )
}