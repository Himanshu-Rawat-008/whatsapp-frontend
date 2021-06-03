import React from "react";
import {
  Container,
  Content,
  Header,
  HeaderTitle,
  HeaderWrapper,
  Info,
  Link,
  SocialContainer,
  Title,
} from "./styles";
import WhatsappIcon from "@material-ui/icons/WhatsApp";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
function Home() {
  return (
    <Container>
      <Header>
        <HeaderWrapper>
          <WhatsappIcon />
          <HeaderTitle>WhatsApp</HeaderTitle>
        </HeaderWrapper>

        <HeaderWrapper>
          <Link to="/signin">Sign In</Link>
          <Link to="/signup">Sign Up</Link>
        </HeaderWrapper>
      </Header>

      <Content>
        <Title>Whatsapp Clone</Title>
        <Info>Created By:- Himanshu Rawat</Info>
      </Content>

      <SocialContainer>
        <a href="github.com">
          <GitHubIcon />
        </a>
        <a href="github.com">
          <LinkedInIcon />
        </a>
      </SocialContainer>
    </Container>
  );
}

export default Home;
