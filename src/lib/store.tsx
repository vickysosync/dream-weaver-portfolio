import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  initialAbout,
  initialEnquiries,
  initialHero,
  initialPortfolio,
  initialServices,
  initialSettings,
  initialTestimonials,
  type About,
  type Enquiry,
  type Hero,
  type Project,
  type Service,
  type Settings,
  type Testimonial,
} from "./data";

const KEY = "dfe-data-v1";
const AUTH_KEY = "dfe-admin-auth";

export const DEMO_EMAIL = "admin@dreamfactoryevents.co";
export const DEMO_PASSWORD = "admin123";

type State = {
  projects: Project[];
  services: Service[];
  testimonials: Testimonial[];
  enquiries: Enquiry[];
  hero: Hero;
  about: About;
  settings: Settings;
};

const defaultState = (): State => ({
  projects: initialPortfolio,
  services: initialServices,
  testimonials: initialTestimonials,
  enquiries: initialEnquiries,
  hero: initialHero,
  about: initialAbout,
  settings: initialSettings,
});

type Ctx = State & {
  hydrated: boolean;
  isAuthed: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  saveProject: (p: Project) => void;
  deleteProject: (id: number) => void;
  toggleFeatured: (id: number) => void;
  saveService: (s: Service) => void;
  deleteService: (id: number) => void;
  saveTestimonial: (t: Testimonial) => void;
  deleteTestimonial: (id: number) => void;
  addEnquiry: (e: Omit<Enquiry, "id" | "status" | "createdAt">) => void;
  setEnquiryStatus: (id: number, status: Enquiry["status"]) => void;
  deleteEnquiry: (id: number) => void;
  setHero: (h: Hero) => void;
  setAbout: (a: About) => void;
  setSettings: (s: Settings) => void;
  resetDemoData: () => void;
};

const DataContext = createContext<Ctx | null>(null);

const nextId = (items: { id: number }[]) =>
  items.reduce((max, i) => Math.max(max, i.id), 0) + 1;

export function DataProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>(defaultState);
  const [isAuthed, setIsAuthed] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(KEY);
      if (raw) setState({ ...defaultState(), ...(JSON.parse(raw) as State) });
      setIsAuthed(window.localStorage.getItem(AUTH_KEY) === "true");
    } catch {
      /* ignore corrupted storage */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      /* storage full or unavailable */
    }
  }, [state, hydrated]);

  const update = useCallback(
    (fn: (s: State) => State) => setState((prev) => fn(prev)),
    [],
  );

  const value = useMemo<Ctx>(
    () => ({
      ...state,
      hydrated,
      isAuthed,
      login: (email, password) => {
        const ok =
          email.trim().toLowerCase() === DEMO_EMAIL && password === DEMO_PASSWORD;
        if (ok) {
          setIsAuthed(true);
          try {
            window.localStorage.setItem(AUTH_KEY, "true");
          } catch {
            /* noop */
          }
        }
        return ok;
      },
      logout: () => {
        setIsAuthed(false);
        try {
          window.localStorage.removeItem(AUTH_KEY);
        } catch {
          /* noop */
        }
      },
      saveProject: (p) =>
        update((s) => ({
          ...s,
          projects: p.id
            ? s.projects.map((x) => (x.id === p.id ? p : x))
            : [...s.projects, { ...p, id: nextId(s.projects) }],
        })),
      deleteProject: (id) =>
        update((s) => ({ ...s, projects: s.projects.filter((p) => p.id !== id) })),
      toggleFeatured: (id) =>
        update((s) => ({
          ...s,
          projects: s.projects.map((p) =>
            p.id === id ? { ...p, featured: !p.featured } : p,
          ),
        })),
      saveService: (sv) =>
        update((s) => ({
          ...s,
          services: sv.id
            ? s.services.map((x) => (x.id === sv.id ? sv : x))
            : [...s.services, { ...sv, id: nextId(s.services) }],
        })),
      deleteService: (id) =>
        update((s) => ({ ...s, services: s.services.filter((x) => x.id !== id) })),
      saveTestimonial: (t) =>
        update((s) => ({
          ...s,
          testimonials: t.id
            ? s.testimonials.map((x) => (x.id === t.id ? t : x))
            : [...s.testimonials, { ...t, id: nextId(s.testimonials) }],
        })),
      deleteTestimonial: (id) =>
        update((s) => ({
          ...s,
          testimonials: s.testimonials.filter((x) => x.id !== id),
        })),
      addEnquiry: (e) =>
        update((s) => ({
          ...s,
          enquiries: [
            {
              ...e,
              id: nextId(s.enquiries),
              status: "New" as const,
              createdAt: new Date().toISOString().slice(0, 10),
            },
            ...s.enquiries,
          ],
        })),
      setEnquiryStatus: (id, status) =>
        update((s) => ({
          ...s,
          enquiries: s.enquiries.map((e) => (e.id === id ? { ...e, status } : e)),
        })),
      deleteEnquiry: (id) =>
        update((s) => ({ ...s, enquiries: s.enquiries.filter((e) => e.id !== id) })),
      setHero: (hero) => update((s) => ({ ...s, hero })),
      setAbout: (about) => update((s) => ({ ...s, about })),
      setSettings: (settings) => update((s) => ({ ...s, settings })),
      resetDemoData: () => setState(defaultState()),
    }),
    [state, hydrated, isAuthed, update],
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used inside DataProvider");
  return ctx;
}
