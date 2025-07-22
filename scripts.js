// Requisitos de cada ramo (prerrequisitos)
const prereqs = {
  "MAT1610": ["MAT1000"],
  "MAT1620": ["MAT1610"],
  "FIS1514": ["MAT1610"],
  "QIM100A": ["QIM100"],
  "MAT1630": ["MAT1620"],
  "MAT1640": ["MAT1203", "MAT1620"],
  "ICS1113": ["MAT1203", "MAT1620", "IIC1103"],
  "EYP1113": ["MAT1630"],
  "FIS1533": ["MAT1630"],
  "ICS2523": ["EAE105A", "ICS1113"],
  "ICS2121": ["MAT1630", "ICS1113"],
  "ICS2563": ["EYP1113"],
  "ICS2123": ["ICS1113", "EYP1113"],
  "ICC2105": ["QIM100A", "FIS1514"],
  "ICC2204": ["EYP1113"],
  "ICS2122": ["ICS2121", "ICS2123", "ICS2563"]
};

