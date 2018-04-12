// 使用外部样式文件
import footerStyle from '../assets/styles/footer.styl'
export default {
  data () {
    return {
      author: 'Lance'
    }
  },
  render () {
    return (
      <div id={footerStyle.footer}>
        <span>Written by {this.author}</span>
      </div>
    )
  }
}
