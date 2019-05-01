import React from 'react';

class SellerApproveItemPage extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      note: ''
    }
  }

  onNoteChange = (e) => {
    const note = e.target.value;
    this.setState(() => ({note}));
  }

  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Approve or Disapprove Buyer</h1>
          </div>
        </div> 

          <div className="content-container">
            <div className="form">
            <div >
              <button className="button">Approve</button>
            </div>
              <div >
                <textarea
                  placeholder="Add a note to explain your disapproval"
                  className="textarea"
                  value={this.state.note}
                  onChange={this.onNoteChange}
                >
                </textarea>
                
                <div>
                  <button className="button--secondary">Disapprove</button>
                </div>

              </div>
            </div>
          </div>
      </div>
    );
  }
}

export default SellerApproveItemPage;