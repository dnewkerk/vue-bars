import { defineComponent, h, getCurrentInstance } from 'vue'
import VuePath from './VuePath'

export default defineComponent({
  name: 'VueBars',

  props: {
    data: {
      type: Array,
      required: true
    },
    autoDraw: {
      type: Boolean,
    },
    barWidth: {
      type: Number,
      default: 8
    },
    rounding: {
      type: Number,
      default: 2
    },
    growDuration: {
      type: Number,
      default: 0.5
    },
    gradient: {
      type: Array,
      default: () => ['#000']
    },
    max: {
      type: Number,
      default: -Infinity
    },
    min: {
      type: Number,
      default: Infinity
    },
    minBarHeight: {
      type: Number,
      default: 3
    },
    labelData: {
      type: Array,
      default: () => []
    },
    labelRotate: {
      type: Number,
      default: -45
    },
    labelColor: {
      type: String,
      default: '#999'
    },
    labelSize: {
      type: Number,
      default: 0.7
    },
    height: {
      type: Number,
    },
    width: {
      type: Number,
    },
    padding: {
      type: Number,
      default: 8
    }
  },

  render() {
    if (!this.data || this.data.length < 2) return
    const { width, height, padding } = this
    const viewWidth = width || 300
    const viewHeight = height || 75
    const boundary = {
      minX: padding,
      minY: padding,
      maxX: viewWidth - padding,
      maxY: viewHeight - padding,
      minBarHeight: this.minBarHeight
    }
    const labelProps = {
      minX: padding,
      minY: padding,
      maxX: viewWidth - padding,
      maxY: viewHeight - padding,
      labelData: this.labelData,
      labelRotate: this.labelRotate,
      labelColor: this.labelColor,
      labelSize: this.labelSize
    }

    const instance = getCurrentInstance()
    const props = Object.assign({
      id: 'vue-bars-' + instance.uid,
      boundary,
      labelProps,
    }, this.$props)

    return h('svg', {
      width: width || '100%',
      height: height || '25%',
      viewBox: `0 0 ${viewWidth} ${viewHeight}`
    }, [
      h(VuePath, props)
    ])
  }
})
