import React, { useState, useEffect, useRef } from 'react';

const WhatsAppIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.956-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 4.315 1.907 6.03l-.412 1.517 1.524-.411zM12.012 7.781c-.121 0-.242.022-.358.065-1.152.428-2.062 1.834-2.225 2.01-.163.175-.327.182-.49.182-.163 0-.327-.007-.49-.007-.163 0-.427-.038-.65-.116-.223-.078-1.385-.516-2.64-1.623-1.42-1.248-2.384-2.826-2.529-3.003-.145-.177-.29-.248-.48-.248-.153 0-.307.007-.46.007s-.327.045-.49.223c-.163.177-.65.787-.812 1.523-.162.736-.162 1.524.012 1.748.175.223.327.354.49.49.163.136.247.223.352.378 1.433 2.139 3.484 3.565 5.592 4.157.49.136.812.203 1.077.26.49.107 1.028.157 1.482.107.49-.057 1.482-.604 1.717-1.18.235-.576.235-1.076.162-1.18s-.163-.162-.352-.288c-.188-.124-.427-.203-.65-.24-.223-.037-.427-.057-.65-.057-.223 0-.46.015-.65.107-.188.092-.427.411-.533.516s-.207.188-.352.107c-.145-.078-.717-.335-1.385-.688-1.077-.576-1.748-1.34-1.912-1.566s-.163-.207-.038-.335c.125-.125.27-.288.378-.378s.163-.125.247-.203c.085-.078.125-.162.188-.247s.038-.162.012-.247c-.025-.085-.248-.995-.336-1.36z" />
    </svg>
);

const ChatIcon = () => (
     <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
);

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const SendIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
    </svg>
);


const faqs = [
    { id: 1, question: "What are your shipping options?", answer: "We offer free standard shipping on all orders. Express shipping is available for an additional $15." },
    { id: 2, question: "How do I track my order?", answer: "You can track your order using the 'Track Order' link in the main menu. You will need your order ID, which was sent to your email." },
    { id: 3, question: "What is the return policy?", answer: "We have a 30-day return policy for unopened products. Please contact support to initiate a return process. Products must be unopened and in original packaging." },
    { id: 4, question: "Do you offer professional installation?", answer: "Yes! We offer professional installation with our 'Pro' and 'Enterprise' plans. You can also add it as a service during checkout for other products." },
    { id: 5, question: "What is the product warranty?", answer: "Most of our products come with a 1-year manufacturer's warranty. Please check the product description for specific warranty details." },
    { id: 6, question: "Do you offer technical support?", answer: "Yes, we offer technical support via email and phone. Please visit our 'Contact Us' page for details." },
];

interface Message {
    id: number;
    sender: 'bot' | 'user';
    text: string;
}

const ChatWidget: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [showFaqs, setShowFaqs] = useState(true);
    const chatLogRef = useRef<HTMLDivElement>(null);
    
    const whatsappNumber = '12025550113';
    const prefilledMessage = encodeURIComponent('Hello CCTV World! I have a question.');
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${prefilledMessage}`;

    useEffect(() => {
        if (isOpen) {
            setMessages([{ id: 1, sender: 'bot', text: 'Hello! How can I help you today? Please select a question below or type your own.' }]);
            setShowFaqs(true);
            setInputValue('');
        }
    }, [isOpen]);

    useEffect(() => {
        if (chatLogRef.current) {
            chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
        }
    }, [messages]);

    const handleFaqClick = (faq: typeof faqs[0]) => {
        const userMessage: Message = { id: Date.now(), sender: 'user', text: faq.question };
        setMessages(prev => [...prev, userMessage]);
        setShowFaqs(false);

        setTimeout(() => {
            const botMessage: Message = { id: Date.now() + 1, sender: 'bot', text: faq.answer };
            setMessages(prev => [...prev, botMessage]);
        }, 500); // Simulate bot "thinking"
    };
    
    const handleManualSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const text = inputValue.trim();
        if (!text) return;

        const userMessage: Message = { id: Date.now(), sender: 'user', text };
        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setShowFaqs(false);

        // Simulate bot response for manual questions
        setTimeout(() => {
            const botResponse: Message = { id: Date.now() + 1, sender: 'bot', text: "Thank you for your question. For a detailed answer, please connect with one of our human agents." };
            setMessages(prev => [...prev, botResponse]);
        }, 1000);
    };


    const handleAskAnother = () => {
        setMessages(prev => [...prev, { id: Date.now(), sender: 'bot', text: 'What else can I help you with?' }]);
        setShowFaqs(true);
    };

    return (
        <div className="fixed bottom-5 right-5 z-50">
            {/* Chat Window */}
            <div 
                className={`
                    bg-white rounded-lg shadow-2xl w-80 mb-4 flex flex-col transition-all duration-300 ease-in-out
                    ${isOpen ? 'h-96 opacity-100' : 'h-0 opacity-0 pointer-events-none'}
                `}
            >
                {/* Header */}
                <div className="bg-blue-600 text-white p-3 flex justify-between items-center rounded-t-lg flex-shrink-0">
                    <h3 className="font-bold text-lg">CCTV World Support</h3>
                    <button onClick={() => setIsOpen(false)} className="text-white hover:opacity-75">
                       <CloseIcon />
                    </button>
                </div>
                
                {/* Chat Body */}
                <div ref={chatLogRef} className="flex-grow p-4 overflow-y-auto space-y-4">
                    {messages.map(msg => (
                        <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] p-3 rounded-lg ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                </div>

                {/* FAQ/Actions section */}
                <div className="p-3 border-t bg-gray-50 flex-shrink-0">
                    {showFaqs ? (
                        <div className="space-y-2">
                            {faqs.map(faq => (
                                <button key={faq.id} onClick={() => handleFaqClick(faq)} className="w-full text-left p-2 text-sm bg-white border rounded-md hover:bg-gray-100 text-blue-700">
                                    {faq.question}
                                </button>
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-2">
                            <button onClick={handleAskAnother} className="w-full p-2 bg-blue-100 text-blue-700 font-semibold rounded-md hover:bg-blue-200">
                                Ask Another Question
                            </button>
                            <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center w-full p-2 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-colors"
                            >
                                <WhatsAppIcon />
                                <span className="ml-2">Chat with a Human</span>
                            </a>
                        </div>
                    )}
                </div>
                 {/* Input Form */}
                 <div className="p-2 border-t bg-white rounded-b-lg flex-shrink-0">
                    <form onSubmit={handleManualSubmit} className="flex gap-2">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Type your message..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                            autoComplete="off"
                        />
                        <button 
                            type="submit" 
                            className="bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700 disabled:bg-blue-300"
                            disabled={!inputValue.trim()}
                            aria-label="Send message"
                        >
                            <SendIcon />
                        </button>
                    </form>
                </div>
            </div>

            {/* Floating Action Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-blue-600 text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center hover:bg-blue-700 transition-transform hover:scale-110"
                aria-label="Open chat"
            >
                {isOpen ? <CloseIcon /> : <ChatIcon />}
            </button>
        </div>
    );
};

export default ChatWidget;