// Central icon registry. Data files reference icons by name (e.g. 'BarChart3');
// add new names here when you use a new icon. Browse: https://lucide.dev/icons
import {
  AppWindow,
  ArrowRight,
  ChartColumn,
  Bot,
  Boxes,
  Briefcase,
  Calculator,
  Circle,
  ClipboardList,
  CodeXml,
  Database,
  Factory,
  FolderTree,
  Layers,
  Lightbulb,
  Network,
  Sheet,
  Sigma,
  Sparkles,
  Table2,
  Target,
  TrendingUp,
  User,
  Users,
  Workflow,
} from 'lucide-react'

const registry = {
  AppWindow,
  ArrowRight,
  BarChart3: ChartColumn,
  Bot,
  Boxes,
  Briefcase,
  Calculator,
  ClipboardList,
  Code2: CodeXml,
  Database,
  Factory,
  FolderTree,
  Layers,
  Lightbulb,
  Network,
  Sheet,
  Sigma,
  Sparkles,
  Table2,
  Target,
  TrendingUp,
  User,
  Users,
  Workflow,
}

export default function Icon({ name, ...props }) {
  const Component = registry[name] ?? Circle
  return <Component aria-hidden="true" {...props} />
}
