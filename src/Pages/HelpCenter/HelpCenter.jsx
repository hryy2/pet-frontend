import './HelpCenter.css'
import { useState } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

const faqs = [
  {
    question: 'Which pets are suitable for your pet food?',
    answer: 'Our products are mainly suitable for dogs and cats. We have corresponding nutritional formulas for pets of different ages and body types. Please select the appropriate products according to your category.',
  },
  {
    question: 'How long is the shelf life of pet food?',
    answer: 'Most pet food has a shelf life of 12 to 18 months. For specific details, please check the production and expiration dates on the back of the package.',
  },
  {
    question: 'Do you offer grain-free or natural organic pet food?',
    answer: 'Yes, we offer food options that are grain-free, organic, and targeted at pets with sensitive stomachs. Please select the relevant labels in the product filter.',
  },
  {
    question: 'How should I choose the food suitable for my pet?',
    answer: 'You can filter your pet based on its age (juvenile, adult, old), weight, breed and whether it has a history of allergies. If you have any questions, you can contact customer service for recommendations.',
  },
  {
    question: 'Is it possible to taste it or have a small trial package?',
    answer: 'Some brands offer sample packs or small packages. You can check the product details to see if a sample option is available.',
  },
  {
    question: 'What should I do if my pet feels unwell after eating your product?',
    answer: 'Please stop feeding immediately and contact a veterinarian. If it is confirmed to be a product issue, we will assist in handling returns and exchanges and record feedback to improve the product.',
  },
  {
    question: 'What is the delivery range and time like?',
    answer: 'We currently support delivery throughout New Zealand. Orders will be dispatched within 1-3 working days, but there may be slight delays in some areas.',
  },
  {
    question: 'Is regular subscription service supported?',
    answer: 'Sure! We support a monthly regular delivery service, allowing you to continuously replenish pet food without having to place repeated orders.',
  }
]


const HelpCenter = () => {
  const [activeIndex, setActiveIndex] = useState(null)

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <div className="helpCenterContainer">
      <h2 className="helpTitle">Help Center - Frequently Asked Questions</h2>
      <div className="faqList">
        {faqs.map((faq, index) => (
          <div className="faqItem" key={index}>
            <div className="faqQuestion" onClick={() => toggleFAQ(index)}>
              <span>{faq.question}</span>
              {activeIndex === index ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            {activeIndex === index && <div className="faqAnswer">{faq.answer}</div>}
          </div>
        ))}
      </div>
    </div>
  )
}

export default HelpCenter
