import React, { Component, PropTypes } from 'react';
import update from 'react/lib/update';
import Box from './Box';
import { DropTarget, DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd/modules/backends/HTML5';

const styles = {
  width: 2000,
  height: 2000,
  position: 'relative'
};

const boxTarget = {
  drop(props, monitor, component) {
    const item = monitor.getItem();
    const delta = monitor.getDifferenceFromInitialOffset();
    const left = Math.round(item.left + delta.x);
    const top = Math.round(item.top + delta.y);

    component.moveBox({title: 'Item', left, top});
  }
};

class Container extends Component {

  constructor(props) {
    super(props);
    this.state = {
      boxes: [{title: 'Item', left: 20, top: 20}]
    };
  }

  moveBox(box) {
    this.setState({
      boxes: this.state.boxes.concat([box])
    });
  }

  render() {
    const { connectDropTarget } = this.props;
    const { boxes} = this.state;

    return connectDropTarget(
      <div style={styles}>
        {boxes.map((box, index) => {
          const { left, top, title } = box
          return (
            <Box key={index}
                 id={index}
                 left={left}
                 top={top}>
              {title}
            </Box>
          );
        })}
      </div>
    );
  }
}

Container.propTypes = {
  connectDropTarget: PropTypes.func.isRequired
}

export default DragDropContext(HTML5Backend)(
  DropTarget('box', boxTarget, connect => ({
    connectDropTarget: connect.dropTarget()
  }))(Container)
)
