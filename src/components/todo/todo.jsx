import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { ChevronRight } from "lucide-react"
import _get from "lodash/get";
import "./todo.css"

export default class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherData: null,
      isOpen: false,
      modalPosition: { top: 0, left: 0 },
    }
    this.buttonRef = React.createRef(null);
  }

  toggleModal = () => {
    const { isOpen } = this.state;
    if (!isOpen && this.buttonRef.current) {
      const rect = this.buttonRef.current.getBoundingClientRect();
      this.setState({
        modalPosition: {
					top: rect.bottom + window.scrollY,
					left: rect.left + window.scrollX,
        }
    	})
    }
    this.setState({
      isOpen: !isOpen
    })
  };

  openModal = () => {
    this.setState({
      isOpen: false
    })
  }


  render() {
    const { modalPosition, isOpen } = this.state;
  
    return (
			<div className="buttonContainer">
				<button ref={this.buttonRef} onClick={this.toggleModal}>Toggle Modal</button>
				{isOpen && (
					<div className="modalContainer" style={{ top: modalPosition.top, left: modalPosition.left }}>
						<p className="title">Todo List</p>
            { /* todo input */}
            <div className='inputContainer'>
              <Input type="text" className="todoInput" placeholder="Add Todo..."/>
              <Button className="addButton">
                <ChevronRight className="addIcon"/>
              </Button>
            </div>

            { /* todo list */}
            <div className='listContainer'>
              <Checkbox id="terms1" />
              <label htmlFor="terms1" className="">Accept terms and conditions</label>
            </div>
					</div>
				)}
			</div>
    );
  }
}
