import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
 title: {
    type: String,
  },
  type: {
    type: String,
    enum: ["Paragraph", "Multiple Choice", "Short Answer"],
  },
  choices: {
    type: [String],
  }
});

const formSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
     required: true,
  },
  questions: [questionSchema],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Form = mongoose.models.Form || mongoose.model("Form", formSchema);

export default Form;

