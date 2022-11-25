import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import "./App.css";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Navbar from "./components/Navbar";
import { RQSuperHero } from "./components/RQSuperHero";
import { Queries } from "./components/Queries";
import { DynamicParalle } from "./components/DynamicParalle";
import { DependentQueries } from "./components/DependentQueries";
const RQSuperHeroes = React.lazy(() => import("./components/RQSuperHeroes"));
const Home = React.lazy(() => import("./components/Home"));
const SuperHeroes = React.lazy(() => import("./components/SuperHeroes"));
const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Navbar />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/rq-super-heroes/:heroId" element={<RQSuperHero />} />
            <Route
              path="/rq-dynamic"
              element={<DynamicParalle heroIds={[1, 3]} />}
            />
            <Route
              path="/dependent-queries"
              element={<DependentQueries email={"vishwas@example.com"} />}
            />
            <Route path="/rq-parallel" element={<Queries />} />
            <Route path="/" element={<Home />} />
            <Route path="/super-heroes" element={<SuperHeroes />} />
            <Route path="/rq-super-heroes" element={<RQSuperHeroes />} />
          </Routes>
        </Suspense>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} position={"bottom-right"} />
    </QueryClientProvider>
  );
}

export default App;
