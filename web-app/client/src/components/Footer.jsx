import { FaLinkedin, FaTwitter, FaGithub, FaGitlab } from 'react-icons/fa';
import '../css/Footer.css';
import '../css/App.css';

function Footer() {
    return (
        <>
            <div className="d-flex footerContainer justify-content-around">
                {/* Socials */}
                <div className="d-flex flex-column pt-3 pb-3 align-items-center">
                    <h3>Socials</h3>
                    <div className="d-flex align-items-center mb-1">
                        <FaLinkedin style={{ marginRight: '0.5rem' }} />
                        <a
                            href="https://linkedin.com/in/cory-versfeld-62937a283/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="iconLink"
                        >
                            LinkedIn
                        </a>
                    </div>

                    <div className="d-flex align-items-center mb-1">
                        <FaTwitter style={{ marginRight: '0.5rem' }} />
                        <a
                            href="https://twitter.com/zwcory"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="iconLink"
                        >
                            Twitter
                        </a>
                    </div>

                    <div className="d-flex align-items-center mb-1">
                        <FaGithub style={{ marginRight: '0.5rem' }} />
                        <a
                            href="https://github.com/zwcory"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="iconLink"
                        >
                            GitHub
                        </a>
                    </div>
                    <div className="d-flex align-items-center mb-1">
                        <FaGitlab style={{ marginRight: '0.5rem' }} />
                        <a
                            href="https://git.cardiff.ac.uk/c22042486/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="iconLink"
                        >
                            GitLab
                        </a>
                    </div>
                </div>

                {/* Code */}
                <div className="d-flex flex-column pt-3 pb-3">
                    <h3>Code</h3>
                    <a
                        href="https://github.com/zwcory/SimpleToDo"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="iconLink"
                    >
                        Docs
                    </a>
                </div>

                {/* Attributions (Hidden on smaller screens) */}
                <div className="d-flex flex-column pt-3 pb-3" id={'attributions'}>
                    <h3>Attributions</h3>
                    <a
                        href="https://github.com/zwcory/SimpleToDo/wiki/Attributions"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="iconLink"
                    >
                        Resources
                    </a>
                </div>

                {/* Copyright */}
                <div className="d-flex flex-column pt-3 pb-3">
                    <h3>Copyright</h3>
                    <h6>© 2025 Cory Versfeld</h6>
                </div>
            </div>
        </>
    );
}

export default Footer;
