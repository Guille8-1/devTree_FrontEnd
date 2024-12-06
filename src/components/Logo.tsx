import { Link } from "react-router-dom"

const LogoHeader = () => {
    return (
      <>
        <Link to="/">
          <img src="/logo.svg" className="w-full block" alt="devtree-logo"/>
        </Link>
      </>
    );
}

export default LogoHeader