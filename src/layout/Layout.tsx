import { Link } from "react-router";

const Layout = () => {
  return (
    <div style={{margin: 5}}>
      <Link to="/">F!</Link> {' '}
      <Link to="/asd">F2</Link> {' '}
      <Link to="/55">F3</Link> {' '}
    </div>
  );
};

export default Layout;
