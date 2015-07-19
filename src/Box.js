import React, { PropTypes } from 'react';
import { DragSource } from 'react-dnd';

const boxSource = {
  beginDrag(props) {
    const { id, left, top } = props;
    return { id, left, top };
  }
};

class Box {

  render() {
    const { left, top, connectDragSource, isDragging, children } = this.props;

    return connectDragSource(
      <div style={{left: left, top: top}} className="box" >
        {children}
      </div>
    );
  }
}

Box.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  id: PropTypes.any.isRequired,
  left: PropTypes.number.isRequired,
  top: PropTypes.number.isRequired
};

export default DragSource('box', boxSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))(Box)
