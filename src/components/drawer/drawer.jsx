import React from 'react';
import './drawer.css';

export default class Drawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    }
  }

  toggleDrawer = () => {
    const { isOpen } = this.state;
    this.setState({
      isOpen: !isOpen,
    })
  };

  render() {
    const { isOpen } = this.state;
    return (
      <div>
        <button className="drawer-toggle" onClick={this.toggleDrawer}>
          ☰
        </button>
        <div className={`drawer ${isOpen ? 'open' : ''}`}>
          <ul>
            <li><a href="#">Item 1</a></li>
            <li><a href="#">Item 2</a></li>
            <li><a href="#">Item 3</a></li>
          </ul>
        </div>
      </div>
    );
  }
}