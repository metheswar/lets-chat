import React from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBRipple,
} from 'mdb-react-ui-kit';
import { Nav, Offcanvas } from 'react-bootstrap';

// Import MDBReact stylesheets
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const ChatComponent = () => {
  const users = [
    { name: 'John Doe' },
    { name: 'Jane Smith' },
    // Add more users as needed
  ];

  const [showUserList, setShowUserList] = React.useState(false);

  const handleToggleUserList = () => setShowUserList((prev) => !prev);

  return (
    <MDBContainer fluid className="my-5 bg-light text-dark" style={{ maxHeight: '80vh', overflow: 'auto' }}>
      <MDBRow>
        <MDBCol md="4">
          {/* User List Button (visible on mobile) */}
          <MDBBtn color="primary" className="rounded-0 mb-3 d-md-none" onClick={handleToggleUserList}>
            |||
          </MDBBtn>

          {/* User List (visible on larger screens) */}
          <Nav className="flex-column d-none d-md-block">
           
            <MDBInput
              label="Search"
              className="mb-3 mt-2 rounded-0"
              containerClassName="mb-3"
            />

            {/* Create Group Button */}
            <MDBBtn color="primary" className="rounded-0 mb-3">
              Create Group
            </MDBBtn>

            {users.map((user, index) => (
              <div key={index}>
                <hr className="my-2" />
                <Nav.Link>
                  <MDBRipple tag="div" rippleColor="dark">
                    <div className="d-flex align-items-center user-item hover">
                    
                      <img
                        src={`https://mdbootstrap.com/img/new/avatars/${index + 1}.jpg`}
                        alt=''
                        style={{ width: '45px', height: '45px' }}
                        className='rounded-circle'
                      />
                      <div className='ms-3'>
                        <p className='fw-bold mb-1'>{user.name}</p>
                      </div>
                    </div>
                  </MDBRipple>
                </Nav.Link>
              </div>
            ))}
          </Nav>

          {/* Offcanvas User List (visible on mobile) */}
          <Offcanvas show={showUserList} onHide={() => setShowUserList(false)} placement="start">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>User List</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <MDBInput
                label="Search"
                className="mb-3 rounded-0"
                containerClassName="mb-3"
              />


              <MDBBtn color="primary" className="rounded-0 mb-3">
                Create Group
              </MDBBtn>


              <Nav className="flex-column">
                {users.map((user, index) => (
                  <div key={index}>
                    <hr className="my-2" />
                    <Nav.Link>
                      <MDBRipple tag="div" rippleColor="dark">
                        <div className="d-flex align-items-center user-item hover">

                          <img
                            src={`https://mdbootstrap.com/img/new/avatars/${index + 1}.jpg`}
                            alt=''
                            style={{ width: '45px', height: '45px' }}
                            className='rounded-circle'
                          />
                          <div className='ms-3'>
                            <p className='fw-bold mb-1'>{user.name}</p>
                          </div>
                        </div>
                      </MDBRipple>
                    </Nav.Link>
                  </div>
                ))}
              </Nav>
            </Offcanvas.Body>
          </Offcanvas>
        </MDBCol>

        <MDBCol md="8">
          {/* Chat Window */}
          <MDBCard className="rounded-0 h-100" style={{ backgroundColor: '#fff' }}>
            <MDBCardBody className="chat-window">
              {/* Chat Messages */}
              <div className="mb-3 text-start">
                <strong>John Doe:</strong> Hi there!
              </div>
              <div className="mb-3 text-end">
                <strong>You:</strong> Hello!
              </div>
              {/* Add more messages as needed */}
            </MDBCardBody>

            {/* Message Input */}
            <div className="p-3">
              <MDBInput label="Type your message" className="mb-2" />
              <MDBBtn color="primary" className="rounded-0">
                Send
              </MDBBtn>
            </div>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default ChatComponent;
