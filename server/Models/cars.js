const mongoose = require("mongoose");

const SensorSchema = new mongoose.Schema(
  {
    sensorName: String,
    sensor: Number,
    ratio: Number,
  },
  { _id: false }
);

const BarFillSchema = new mongoose.Schema(
  {
    color: String,
    stop: Number,
  },
  { _id: false }
);

const ChartDataSchema = new mongoose.Schema(
  {
    series1: [SensorSchema],
    series2: [SensorSchema],
    valueScalesMX: [SensorSchema],
    bar: {
      fills: [BarFillSchema],
      fillMode: String,
    },
  },
  { _id: false }
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
    label: {
      enabled: Boolean,
      placement: String,
      fontSize: Number,
      color: String,
      fontWeight: String,
      formatter: String,
    },
    marker: {
      enabled: Boolean,
      size: Number,
      color: String,
    },
    shadow: {
      enabled: Boolean,
      color: String,
      xOffset: Number,
      yOffset: Number,
      blur: Number,
    },
  },
  { _id: false }
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
  { _id: false }
);

const CarSchema = new mongoose.Schema(
  {
    slug: String,
    title: String,

    engine: {
      type: {
        type: String,
      },
      power_hp: Number,
      max_rpm: Number,
    },

    performance: {
      braking_g: Number,
      acceleration_g: Number,
    },

    aero: {
      drag: Number,
      downforce: Number,
    },

    dino: {
      chartData: ChartDataSchema,
      BrakeAccelr: BrakeAccelrSchema,
      AeroGforce: {
        AeroDYN: {
          Drag: String,
          Downforce: String,
        },
      },
    },
  },
  { timestamps: true }
);

const CarModel = mongoose.model("cars", CarSchema);
module.exports = CarModel;
