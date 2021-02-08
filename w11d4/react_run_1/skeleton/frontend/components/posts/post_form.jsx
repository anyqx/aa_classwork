import React from 'react';

/*
Export a `PostForm` presentational component that creates a form to either
create or edit a post (it will be used by two separate containers). The form
should indicate whether it is a create or edit form based on the `formType`
prop. The form should initialize state to the `post` passed in from props. Use
controlled inputs and trigger the `action` passed in from the container upon
submission. Use a text input for the title and a textarea for the body.
*/

// class PostForm extends React.Component {
//     constructor(props){
//         super(props);

//         this.state = this.props.post
//     }

//     update(field){
//         return e => {
//             this.setState({[field]: e.currentTarget.value})
//         }
//     }
//     render(){
//         return (
//             <form>
//                 <label>Title
//                     <input type="text" value={this.state.title} onChange={this.update('title')}/>
//                 </label>
//                 <label>Body
//                     <textarea value={this.state.title} onChange={this.update('body')}/>
//                 </label>
//                     <input type="submit" value={this.props.formType}/>
//             </form>
//         )
//     }
// }
// export default PostForm;

class PostForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = this.props.post;

        this.handleTitle = this.handleTitle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleTitle(e) {
        this.setState({ title: e.target.value })
    }

    handleField(field) {
        return (e) => {
            return this.setState({ [field]: e.target.value });
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const post = this.state;

        this.props.action(post);
    }

    render() {
        return (
            <>
                <h3>{this.props.formType}</h3>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" onChange={this.handleTitle} value={this.state.title} />
                    <textarea onChange={this.handleField('body')} value={this.state.body}></textarea>
                </form>
            </>
        )
    }
}

export default PostForm;