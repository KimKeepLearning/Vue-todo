import '../assets/styles/footer.styl'

export default {
    data() {
        return {
            author: "Y. Huang"
        }
    },
    render() {
        return (
            <div id="footer">
                <span> ReWritten by {this.author}</span>
            </div>
        )
    }
}