const mongoose = require("mongoose");

/* ===================== Reusable Schemas ===================== */

const TorquePointSchema = new mongoose.Schema(
  {
    rpm: Number,
    torque: Number,
  },
  { _id: false },
);

const WeightDistributionSchema = new mongoose.Schema(
  {
    front: Number,
    rear: Number,
  },
  { _id: false },
);

const BalanceRangeSchema = new mongoose.Schema(
  {
    min: Number,
    max: Number,
  },
  { _id: false },
);

const SensorSchema = new mongoose.Schema(
  {
    sensorName: String,
    sensor: Number,
    ratio: Number,
    kmh: Number,
  },
  { _id: false },
);

const BarFillSchema = new mongoose.Schema(
  {
    color: String,
    stop: Number,
  },
  { _id: false },
);

/* ===================== Engine ===================== */

const EngineSchema = new mongoose.Schema(
  {
    manufacturer: String,
    model: String,
    type: String,
    displacement: Number,
    maxPowerHP: Number,
    maxRPM: Number,
    torqueCurve: [TorquePointSchema],
  },
  { _id: false },
);

/* ===================== Gearbox ===================== */

const GearboxSchema = new mongoose.Schema(
  {
    type: String,
    gears: Number,
    ratios: [Number],
    finalDrive: Number,
  },
  { _id: false },
);

/* ===================== Chassis ===================== */

const ChassisSchema = new mongoose.Schema(
  {
    monocoque: String,
    weightKg: Number,
    weightDistribution: WeightDistributionSchema,
    wheelbaseMm: Number,
  },
  { _id: false },
);

/* ===================== Aero ===================== */

const AeroSchema = new mongoose.Schema(
  {
    maxDownforceLevel: Number,
    dragSensitivity: Number,
    aeroEfficiency: Number,
    balanceRange: BalanceRangeSchema,
  },
  { _id: false },
);

/* ===================== Brakes ===================== */

const BrakesSchema = new mongoose.Schema(
  {
    type: String,
    material: String,
    maxBrakingG: Number,
    coolingEfficiency: Number,
    fadeRisk: Number,
  },
  { _id: false },
);

/* ===================== Tyres ===================== */

const TyresSchema = new mongoose.Schema(
  {
    supplier: String,
    compoundRange: [String],
    degradationRate: Number,
    warmupSpeed: Number,
    wetPerformance: Number,
  },
  { _id: false },
);

/* ===================== Performance ===================== */

const PerformanceSchema = new mongoose.Schema(
  {
    powerToWeight: Number,
  },
  { _id: false },
);

const PerformanceLimitsSchema = new mongoose.Schema(
  {
    maxAccelerationG: Number,
    maxCorneringG: Number,
    topSpeedKmh: Number,
  },
  { _id: false },
);

/* ===================== Dino / Charts ===================== */

const ChartDataSchema = new mongoose.Schema(
  {
    series: [SensorSchema],
    valueScalesMX: [SensorSchema],
    bar: {
      fills: [BarFillSchema],
      fillMode: String,
    },
  },
  { _id: false },
);

const BrakeAccelrSeriesSchema = new mongoose.Schema(
  {
    type: String,
    xKey: String,
    yKey: String,
    yName: String,
    fill: String,
    stroke: String,
    strokeWidth: Number,
    label: Object,
    marker: Object,
    shadow: Object,
  },
  { _id: false },
);

const BrakeAccelrSchema = new mongoose.Schema(
  {
    Bar: {
      brakeAccelrData: [
        {
          quarter: String,
          brake: Number,
          accelr: Number,
        },
      ],
      brakeAccelrSeries: [BrakeAccelrSeriesSchema],
    },
    RangeArea: {
      RangeData: [
        {
          step: String,
          Braking: Number,
          Acceleration: Number,
        },
      ],
      RangeSeries: [BrakeAccelrSeriesSchema],
    },
  },
  { _id: false },
);

const AeroGforceSchema = new mongoose.Schema(
  {
    AeroDYN: {
      Drag: String,
      Downforce: String,
    },
    GForce: {
      qualityData: Array,
      efficiencyData: Array,
      speedData: Array,
    },
  },
  { _id: false },
);

/* ===================== Main Car Schema ===================== */

const CarSchema = new mongoose.Schema(
  {
    slug: String,
    title: String,

    forai: {
      name: String,
      season: Number,
      engine: EngineSchema,
      gearbox: GearboxSchema,
      chassis: ChassisSchema,
      aero: AeroSchema,
      brakes: BrakesSchema,
      tyres: TyresSchema,
      performance: PerformanceSchema,
      fuel: Object,
      reliability: Object,
      gForce: Object,
    },

    about: {
      engine: EngineSchema,
      gearbox: GearboxSchema,
      chassis: ChassisSchema,
      aero: AeroSchema,
      brakes: BrakesSchema,
      tyres: TyresSchema,
      performanceLimits: PerformanceLimitsSchema,
      about1: String,
      about2: String,
    },

    dino: {
      chartData: ChartDataSchema,
      BrakeAccelr: BrakeAccelrSchema,
      AeroGforce: AeroGforceSchema,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("cars", CarSchema);
