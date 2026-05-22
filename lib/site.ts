export const site = {
  name: "GRC Field Operations",
  legalName: "[Company LLC]",
  tagline: "Industrial field operations · Houston, TX",
  phone: "[281-XXX-XXXX]",
  phoneHref: "tel:+12815550000",
  email: "ops@[domain].com",
  location: "Houston, TX · Gulf Coast",
};

export const capabilities = [
  "Field Machining",
  "Rotating Equipment",
  "Mechanical Services",
  "Shutdown Support",
  "Mobile Crews",
  "Emergency Response",
] as const;

export const services = [
  {
    slug: "field-machining",
    title: "Field Machining",
    short:
      "On-site machining for critical equipment — precision work without full teardown when scope allows.",
    core: true,
  },
  {
    slug: "emergency-field-response",
    title: "Emergency Field Response",
    short:
      "Rapid coordination when production is down — field assessment and mobilized support.",
    core: true,
  },
  {
    slug: "shutdown-turnaround-support",
    title: "Shutdown & Turnaround",
    short:
      "Planned outage support — crews, machining, and mechanical scope aligned to your schedule.",
    core: true,
  },
  {
    slug: "mobile-field-crews",
    title: "Mobile Field Crews",
    short:
      "Mobilized teams and equipment — an extension of full industrial operations, not a one-truck shop.",
    core: true,
  },
  {
    slug: "rotating-equipment",
    title: "Rotating Equipment",
    short:
      "Field support for pumps, compressors, shafts, and related rotating assets — scope confirmed per job.",
    core: false,
  },
  {
    slug: "industrial-mechanical-services",
    title: "Industrial Mechanical",
    short:
      "Mechanical repair and plant support under heavy field conditions — scope confirmed per engagement.",
    core: false,
  },
] as const;

export const industries = [
  { title: "Refineries", line: "Turnaround and in-service field machining support." },
  { title: "Petrochemical", line: "On-site recovery for critical rotating and static equipment." },
  { title: "Power Generation", line: "Field-ready crews for outage windows and urgent response." },
  { title: "Marine & Port", line: "Heavy equipment support in demanding coastal environments." },
  { title: "Manufacturing", line: "Production downtime minimized with on-site capability." },
  { title: "Pipeline & Energy", line: "Infrastructure and midstream field support." },
];

export const processSteps = [
  "Request received",
  "Scope reviewed",
  "Crew / equipment assigned",
  "Field deployment",
  "On-site execution",
  "Documentation & reporting",
];

export const gulfCities = [
  "Houston",
  "Pasadena",
  "Baytown",
  "Deer Park",
  "Beaumont",
  "Port Arthur",
  "Corpus Christi",
];

export const projects = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  industry: ["Refinery", "Petrochemical", "Power", "Heavy Mfg", "Port", "Energy"][i],
  title: [
    "On-site line boring — critical vessel repair",
    "Flange facing during planned outage",
    "Journal restoration — rotating asset",
    "Large OD machining in the field",
    "Emergency machining response",
    "Shutdown machining support",
  ][i],
  status: "Case study — content pending",
}));
