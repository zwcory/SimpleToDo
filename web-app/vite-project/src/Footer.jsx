import './Footer.css'
import './App.css'

function Footer() {

    return (
        <>
            <div className={"d-flex footerContainer justify-content-around"}>
                {/*Socials*/}
                <div className={'d-flex flex-column pt-3 pb-3'}>
                    <h3>
                        Socials
                    </h3>
                    <h6>
                        LinkedIn
                    </h6>
                    <h6>
                        Twitter
                    </h6>
                    <h6>
                        GitHub
                    </h6>
                </div>
                {/*Code*/}
                <div className={'d-flex flex-column pt-3 pb-3'}>
                    <h3>
                        Code
                    </h3>
                    <h6>
                    Docs
                    </h6>
                    <h6>
                        Rand
                    </h6>
                </div>
                {/*Resources (???)*/}
                <div className={'d-flex flex-column pt-3 pb-3'}>
                    <h3>
                        Legal
                    </h3>
                    <h6>
                        Resources
                    </h6>
                </div>
                {/* Spare */}
                <div className={'d-flex flex-column pt-3 pb-3'}>
                    <h3>
                        Spare Head
                    </h3>
                    <h6>
                        Spare 1
                    </h6>
                    <h6>
                        Spare 2
                    </h6>
                </div>
                </div>
        </>
    )
}

export default Footer;
