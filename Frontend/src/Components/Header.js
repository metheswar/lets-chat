import React, { useState } from 'react';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBCollapse,
} from 'mdb-react-ui-kit';
import defaultProfileImage from './5856.jpg';

const Header = () => {
  const [openBasic, setOpenBasic] = useState(false);

  return (
    <MDBNavbar expand='lg' light bgColor='primary' style={{ padding: '10px' }}>
      <MDBContainer fluid>
        <MDBNavbarBrand href='#' style={{color:'white'}}>Let's Chat</MDBNavbarBrand>

        <MDBNavbarToggler
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setOpenBasic(!openBasic)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar open={openBasic}>
          <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
            {/* Your navigation items go here */}
          </MDBNavbarNav>

          <MDBDropdown>
                <MDBDropdownToggle tag='a' className='nav-link' role='button'>
                  <img
                    src={defaultProfileImage}
                    alt='Profile'
                    className='profile-image'
                    style={{ width: '30px', height: '30px', borderRadius: '50%' }}
                  />
                </MDBDropdownToggle>
                <MDBDropdownMenu style={{cursor:'pointer'}}>
                  <MDBDropdownItem href='#'>Profile</MDBDropdownItem>
                  <MDBDropdownItem divider />
                  <MDBDropdownItem href='#'>Logout</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
};

export default Header;
