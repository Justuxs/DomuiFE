import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import TournamentPage from "./pages/Tournament";
import LoginPage from "./pages/Login";
import ResultsPage from "./pages/Results";
import RegisterPage from "./pages/Register";
import PrivateRoute from "./pages/PrivateRoute";
import PlayersPage from "./pages/Players";
import ResultsGroupsPage from "./pages/ResultsGroups";
import NavigationBarLayout from "./layout/NavigationBarLayout";
import TournamentTable from "./components/tournamentTable/TournamentTable";
import TakenBooks from "./pages/TakenBooks";
import TakenBooksHistoryPage from "./pages/TakenBooksHistory";
import AdminPage from "./pages/Admin";


//"C:\Program Files\Google\Chrome\Application\chrome.exe" --disable-web-security --disable-gpu --user-data-dir=~/chromeTemp
function App() {
  return (
    <Router>
      <Routes>
        <Route
          element={
            <PrivateRoute>
              <NavigationBarLayout />
            </PrivateRoute>
          }
        >
          <Route
            path="/"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route path="/tournament">
            <Route
              index
              element={
                <PrivateRoute>
                  <TournamentPage />
                </PrivateRoute>
              }
            />
            <Route
              path=":id"
              element={
                <PrivateRoute>
                  <TournamentTable />
                </PrivateRoute>
              }
            />
          </Route>
          <Route
            path="/results"
            element={
              <PrivateRoute>
                <ResultsPage />
              </PrivateRoute>
            }
          >
            <Route
              index
              element={
                <PrivateRoute>
                  <ResultsPage />
                </PrivateRoute>
              }
            />
            <Route
              path=":id"
              element={
                <PrivateRoute>
                  <ResultsPage />
                </PrivateRoute>
              }
            />
          </Route>
          <Route
            path="/players"
            element={
              <PrivateRoute>
                <PlayersPage />
              </PrivateRoute>
            }
          />
            <Route
                path="/return"
                element={
                    <PrivateRoute>
                        <TakenBooks />
                    </PrivateRoute>
                }
            />
            <Route
                path="/history"
                element={
                    <PrivateRoute>
                        <TakenBooksHistoryPage />
                    </PrivateRoute>
                }
            />
            <Route
                path="/admin"
                element={
                    <PrivateRoute>
                        <AdminPage />
                    </PrivateRoute>
                }
            />
          <Route
            path="/resultsGroups"
            element={
              <PrivateRoute>
                <ResultsGroupsPage />
              </PrivateRoute>
            }
          />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}

export default App;
