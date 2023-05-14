import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { LaunchApp } from "./pages/LaunchApp";
import { Governance } from "./pages/Governance";
import { Partners } from "./pages/Partners";
import { Header } from "./components/Header/Header";
import { HeaderPhone } from "./components/HeaderPhone/HeaderPhone";
import { ReadWhitePaperList } from "./components/ReadWhitePaperList/ReadWhitePaperList";
import "./index.scss";
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum';
import { Web3Modal } from '@web3modal/react';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { polygon } from 'wagmi/chains';

const projectId = process.env.REACT_APP_PROJECT_ID;
const chains = [polygon];

const { provider} = configureChains(
  chains,
  [
    w3mProvider({ projectId }),
  ],
)

const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 2, chains }),
  provider,
});

const ethereumClient = new EthereumClient(wagmiClient, chains);

export const App = () => {

  return (
    <>
      <WagmiConfig client={wagmiClient}>
      <main>
      <div className="phone-hiden">
      <Header/>     
      </div>
      <div className="page__header-phone">
        <HeaderPhone />
      </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="/app" element={<LaunchApp/>} />
          <Route path="/governance" element={<Governance />} />
          <Route path="/read-white-paper-list" element={<ReadWhitePaperList />} />
          <Route path="/partners" element={<Partners />} />
        </Routes>
      </main>
      </WagmiConfig>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} /> 
    </>
  );
};
