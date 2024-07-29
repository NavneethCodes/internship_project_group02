import React, { useState } from 'react';
import styled from 'styled-components';
import './AdminDashboard.css'

const Container = styled.div`
  display: flex;
  height: 100vh;
  width:100vw;
  background-color: #f0f2f5;
`;

const Sidebar = styled.div`
  width: 250px;
  padding: 20px;
  background-color: #fff;
  border-right: 1px solid #ddd;
`;

const SidebarItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0;
  cursor: pointer;

  &:hover {
    background-color: #f2f2f2;
  }
`;

const SidebarIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 10px;
`;

const Main = styled.div`
  flex: 1;
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 24px;
`;

const Calendar = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px;
`;

const CalendarDay = styled.div`
  background-color: #fff;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
  cursor: pointer;

  &.active {
    background-color: #f2f2f2;
  }
`;

const Schedule = styled.div`
  margin-top: 20px;
`;

const ScheduleItem = styled.div`
  background-color: #fff;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const ScheduleTitle = styled.h3`
  margin: 0;
  font-size: 18px;
`;

const ScheduleTime = styled.span`
  font-size: 14px;
  color: #666;
`;

const ScheduleActions = styled.div`
  display: flex;
  align-items: center;
`;

const ScheduleAction = styled.button`
  background-color: transparent;
  border: none;
  margin-left: 10px;
  font-size: 16px;
  cursor: pointer;

  &.invite {
    color: #007bff;
  }

  &.create-task {
    background-color: #007bff;
    color: #fff;
    padding: 8px 15px;
    border-radius: 5px;
  }
`;

const ScheduleDetails = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
`;

const ScheduleDetailsIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const ScheduleDetailsText = styled.span`
  font-size: 14px;
  color: #666;
`;

const UpgradeSection = styled.div`
  position: absolute;
  height:70px;
  bottom: 100px;
  left: 40px;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const UpgradeTitle = styled.h3`
  margin: 0;
  font-size: 18px;
`;

const UpgradeButton = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  cursor: pointer;

  margin-top:15px;
`;

const ScheduleItemActions = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  opacity: 0;
  transition: opacity 0.3s ease;

  ${ScheduleItem}:hover & {
    opacity: 1;
  }
`;

const ScheduleItemAction = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const ScheduleItemActionIcon = styled.img`
  width: 16px;
  height: 16px;
`;

const AdminDashboard = () => {
  const [activeDay, setActiveDay] = useState(2);

  const handleDayClick = (day) => {
    setActiveDay(day);
  };

  const scheduleItems = [
    {
      userName: 'Navneeth Arun',
      joined: '06 December',
      status: 'Active',
    },
    {
        userName: 'Harisankar.S',
        joined: '06 December',
        status: 'Active',
    },
  ];

  return (
    <Container>
      <Sidebar>
        <SidebarItem>
          {/* <SidebarIcon src="https://img.icons8.com/ios/50/000000/bell.png" /> */}
          Alerts
        </SidebarItem>
        <SidebarItem>
          {/* <SidebarIcon src="https://img.icons8.com/ios/50/000000/calendar.png" /> */}
          Calendar
        </SidebarItem>
        <SidebarItem>
          {/* <SidebarIcon src="https://img.icons8.com/ios/50/000000/contacts.png" /> */}
          Contacts
        </SidebarItem>
        <SidebarItem>
          {/* <SidebarIcon src="https://img.icons8.com/ios/50/000000/notification.png" /> */}
          Notifications
        </SidebarItem>
        <SidebarItem>
          {/* <SidebarIcon src="https://img.icons8.com/ios/50/000000/key.png" /> */}
          Passwords
        </SidebarItem>
        <SidebarItem>
          {/* <SidebarIcon src="https://img.icons8.com/ios/50/000000/settings.png" /> */}
          Settings
        </SidebarItem>
      </Sidebar>
      <Main>
        <Header>
          <Title>Users</Title>
          <span>April, 1 Friday</span>
        </Header>
        <Calendar>
          {[...Array(7).keys()].map((day) => (
            <CalendarDay
              key={day + 1}
              onClick={() => handleDayClick(day + 1)}
              className={activeDay === day + 1 ? 'active' : ''}
            >
              {day + 1}
            </CalendarDay>
          ))}
        </Calendar>
        <Schedule>
          {scheduleItems.map((item, index) => (
            <ScheduleItem key={index}>
              <ScheduleTitle>{item.userName}</ScheduleTitle>
              <ScheduleTime>{item.joined}</ScheduleTime>
              <ScheduleActions>
                <ScheduleAction className="invite">Invite</ScheduleAction>
                <ScheduleItemActions>
                  <ScheduleItemAction>
                    <ScheduleItemActionIcon src="https://img.icons8.com/ios/50/000000/trash.png" />
                  </ScheduleItemAction>
                  <ScheduleItemAction>
                    <ScheduleItemActionIcon src="https://img.icons8.com/ios/50/000000/edit.png" />
                  </ScheduleItemAction>
                </ScheduleItemActions>
              </ScheduleActions>
              {item.status && (
                <ScheduleDetails>
                  <ScheduleDetailsIcon src="https://img.icons8.com/ios/50/000000/check-circle.png" />
                  <ScheduleDetailsText className="status">{item.status}</ScheduleDetailsText>
                </ScheduleDetails>
              )}
            </ScheduleItem>
          ))}
          <ScheduleItem>
            <ScheduleTitle>Create User</ScheduleTitle>
            <ScheduleAction className="create-task">Create</ScheduleAction>
          </ScheduleItem>
        </Schedule>
      </Main>
      <UpgradeSection>
        <UpgradeTitle>Self-Destruct ?</UpgradeTitle>
        <UpgradeButton>Go on</UpgradeButton>
      </UpgradeSection>
    </Container>
  );
};

export default AdminDashboard;