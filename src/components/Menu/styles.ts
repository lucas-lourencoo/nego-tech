import * as NavigationMenu from "@radix-ui/react-navigation-menu";

import styled from "styled-components";

export const NavigationMenuRoot = styled(NavigationMenu.Root)`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100vw;
  z-index: 1;
`;

export const NavigationMenuList = styled(NavigationMenu.List)`
  display: flex;
  justify-content: center;
  background-color: white;
  padding: 4;
  border-radius: 6;
  list-style: none;
  box-shadow: 0 2px 10px;
  margin: 0;
`;
