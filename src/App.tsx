import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { ProgressProvider } from './hooks/useProgress'
import { Chiefs } from './pages/Chiefs'
import { DepartmentHub } from './pages/DepartmentHub'
import { Distill } from './pages/Distill'
import { MissionControl } from './pages/MissionControl'
import { Plan } from './pages/Plan'
import { QuestionsPage } from './pages/Questions'
import { Scroll } from './pages/Scroll'
import { Settings } from './pages/Settings'
import { Simulator } from './pages/Simulator'
import { Stories } from './pages/Stories'

export default function App() {
  return (
    <ProgressProvider>
      <HashRouter>
        <Routes>
          <Route path="scroll" element={<Scroll />} />
          <Route element={<Layout />}>
            <Route index element={<MissionControl />} />
            <Route path="efr" element={<DepartmentHub />} />
            <Route path="bfd" element={<DepartmentHub />} />
            <Route path="dept/:deptId" element={<DepartmentHub />} />
            <Route path="distill" element={<Distill />} />
            <Route path="stories" element={<Stories />} />
            <Route path="questions" element={<QuestionsPage />} />
            <Route path="simulator" element={<Simulator />} />
            <Route path="plan" element={<Plan />} />
            <Route path="chiefs" element={<Chiefs />} />
            <Route path="settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </HashRouter>
    </ProgressProvider>
  )
}
