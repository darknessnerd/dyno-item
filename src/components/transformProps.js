export default {
  /**
   * Keep element aspect ratio
   */
  lockAspectRatio: {
    type: Boolean,
    default: false,
  },
  w: {
    type: [Number, String],
    default: 200,
    validator: (val) => {
      if (typeof val === 'number') {
        return val > 0;
      }
      return val === 'auto';
    },
  },
  h: {
    type: [Number, String],
    default: 200,
    validator: (val) => {
      if (typeof val === 'number') {
        return val > 0;
      }
      return val === 'auto';
    },
  },
  minWidth: {
    type: Number,
    default: 0,
    validator: (val) => val >= 0,
  },
  minHeight: {
    type: Number,
    default: 0,
    validator: (val) => val >= 0,
  },
  maxWidth: {
    type: Number,
    default: null,
    validator: (val) => val >= 0,
  },
  maxHeight: {
    type: Number,
    default: null,
    validator: (val) => val >= 0,
  },
  x: {
    type: Number,
    default: 0,
  },
  y: {
    type: Number,
    default: 0,
  },
  z: {
    type: [String, Number],
    default: 'auto',
    validator: (val) => (typeof val === 'string' ? val === 'auto' : val >= 0),
  },
  axis: {
    type: String,
    default: 'both',
    validator: (val) => ['x', 'y', 'both'].includes(val),
  },
};
