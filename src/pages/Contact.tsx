import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm, ValidationError } from '@formspree/react';

const ContactContainer = styled.div`
  min-height: 100vh;
  padding: 6rem 2rem;
  background: var(--gradient-light);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('/pattern.svg');
    opacity: 0.05;
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(var(--accent-color-rgb), 0.1) 0%, transparent 70%);
    pointer-events: none;
  }

  .dark &::after {
    background: radial-gradient(circle, rgba(96, 165, 250, 0.15) 0%, transparent 70%);
  }
`;

const ContentWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;
  position: relative;
  z-index: 1;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const HeaderSection = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  margin-bottom: 2rem;
`;

const Title = styled.h2`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1rem;
  color: var(--text-primary);
  position: relative;
  display: inline-block;
  background: linear-gradient(135deg, var(--accent-color), var(--primary-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  .dark & {
    background: linear-gradient(135deg, #93c5fd, #60a5fa);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    filter: drop-shadow(0 0 30px rgba(96, 165, 250, 0.4));
  }

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.8;

  .dark & {
    color: #cbd5e0;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ContactForm = styled(motion.form)`
  background: rgba(255, 255, 255, 0.95);
  padding: 3rem;
  border-radius: 2rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(20px);
  border: 2px solid rgba(255, 255, 255, 0.5);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 25px 70px rgba(0, 0, 0, 0.12);
    transform: translateY(-5px);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, var(--accent-color), var(--primary-color));
  }

  .dark & {
    background: rgba(15, 23, 42, 0.9);
    backdrop-filter: blur(30px);
    border: 2px solid rgba(96, 165, 250, 0.3);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.7),
                0 0 80px rgba(96, 165, 250, 0.15),
                inset 0 0 60px rgba(96, 165, 250, 0.05);
  }

  .dark &:hover {
    border-color: rgba(96, 165, 250, 0.5);
    box-shadow: 0 25px 70px rgba(0, 0, 0, 0.8),
                0 0 100px rgba(96, 165, 250, 0.25),
                inset 0 0 80px rgba(96, 165, 250, 0.08);
  }

  .dark &::before {
    background: linear-gradient(90deg, #60a5fa, #3b82f6);
    box-shadow: 0 0 30px rgba(96, 165, 250, 0.8);
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  position: relative;
`;

const Label = styled.label`
  display: block;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
  transition: all 0.3s ease;

  .dark & {
    color: #e2e8f0;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 1.1rem 1.3rem;
  border: 2px solid rgba(var(--accent-color-rgb), 0.15);
  border-radius: 1rem;
  font-size: 1rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: var(--accent-color);
    background: white;
    box-shadow: 0 0 0 4px rgba(var(--accent-color-rgb), 0.1),
                0 8px 20px rgba(var(--accent-color-rgb), 0.15);
    transform: translateY(-2px);
  }

  &:focus + ${Label} {
    color: var(--accent-color);
  }

  .dark & {
    background: rgba(15, 23, 42, 0.8);
    border: 2px solid rgba(96, 165, 250, 0.25);
    color: #f8fafc;
  }

  .dark &:focus {
    background: rgba(30, 41, 59, 0.9);
    border-color: #60a5fa;
    box-shadow: 0 0 0 4px rgba(96, 165, 250, 0.2),
                0 8px 30px rgba(96, 165, 250, 0.3),
                0 0 40px rgba(96, 165, 250, 0.2);
  }

  .dark &::placeholder {
    color: #64748b;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 1.1rem 1.3rem;
  border: 2px solid rgba(var(--accent-color-rgb), 0.15);
  border-radius: 1rem;
  font-size: 1rem;
  min-height: 180px;
  resize: vertical;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  font-family: inherit;
  line-height: 1.6;

  &:focus {
    outline: none;
    border-color: var(--accent-color);
    background: white;
    box-shadow: 0 0 0 4px rgba(var(--accent-color-rgb), 0.1),
                0 8px 20px rgba(var(--accent-color-rgb), 0.15);
    transform: translateY(-2px);
  }

  .dark & {
    background: rgba(15, 23, 42, 0.8);
    border: 2px solid rgba(96, 165, 250, 0.25);
    color: #f8fafc;
  }

  .dark &:focus {
    background: rgba(30, 41, 59, 0.9);
    border-color: #60a5fa;
    box-shadow: 0 0 0 4px rgba(96, 165, 250, 0.2),
                0 8px 30px rgba(96, 165, 250, 0.3),
                0 0 40px rgba(96, 165, 250, 0.2);
  }

  .dark &::placeholder {
    color: #64748b;
  }
`;

const SubmitButton = styled(motion.button)`
  width: 100%;
  padding: 1.2rem 2rem;
  background: linear-gradient(135deg, var(--accent-color), var(--primary-color));
  color: white;
  border: none;
  border-radius: 1rem;
  font-size: 1.05rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(var(--accent-color-rgb), 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
    transition: 0.5s;
  }

  &:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 12px 35px rgba(var(--accent-color-rgb), 0.4);

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(-1px) scale(0.98);
  }

  &:disabled {
    background: #cbd5e0;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  .dark & {
    background: linear-gradient(135deg, #60a5fa, #3b82f6);
    box-shadow: 0 10px 35px rgba(96, 165, 250, 0.5),
                0 0 60px rgba(96, 165, 250, 0.25);
  }

  .dark &:hover {
    background: linear-gradient(135deg, #93c5fd, #60a5fa);
    box-shadow: 0 15px 45px rgba(96, 165, 250, 0.7),
                0 0 80px rgba(96, 165, 250, 0.4);
  }

  .dark &:disabled {
    background: rgba(51, 65, 85, 0.5);
    box-shadow: none;
  }
`;

const ContactInfo = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
`;

const ContactCard = styled(motion.a)`
  background: rgba(255, 255, 255, 0.95);
  padding: 2.5rem;
  border-radius: 1.8rem;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  gap: 2rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-decoration: none;
  color: inherit;
  backdrop-filter: blur(20px);
  border: 2px solid rgba(255, 255, 255, 0.5);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(var(--accent-color-rgb), 0.05),
      transparent
    );
    transition: 0.5s;
  }

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.12);
    border-color: rgba(var(--accent-color-rgb), 0.3);

    &::before {
      left: 100%;
    }
  }

  .dark & {
    background: rgba(15, 23, 42, 0.9);
    backdrop-filter: blur(30px);
    border: 2px solid rgba(96, 165, 250, 0.3);
    box-shadow: 0 15px 45px rgba(0, 0, 0, 0.7),
                0 0 60px rgba(96, 165, 250, 0.15),
                inset 0 0 40px rgba(96, 165, 250, 0.05);
  }

  .dark &::before {
    background: linear-gradient(
      90deg,
      transparent,
      rgba(96, 165, 250, 0.1),
      transparent
    );
  }

  .dark &:hover {
    border-color: rgba(96, 165, 250, 0.6);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8),
                0 0 80px rgba(96, 165, 250, 0.3),
                inset 0 0 60px rgba(96, 165, 250, 0.08);
    transform: translateY(-10px) scale(1.03);
  }
`;

const ContactIcon = styled.div`
  width: 70px;
  height: 70px;
  background: linear-gradient(135deg, var(--accent-color), var(--primary-color));
  border-radius: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: white;
  flex-shrink: 0;
  box-shadow: 0 8px 25px rgba(var(--accent-color-rgb), 0.4);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  ${ContactCard}:hover & {
    transform: scale(1.1) rotate(5deg);
    box-shadow: 0 12px 35px rgba(var(--accent-color-rgb), 0.6);
  }

  .dark & {
    background: linear-gradient(135deg, #60a5fa, #3b82f6);
    box-shadow: 0 10px 30px rgba(96, 165, 250, 0.6),
                0 0 40px rgba(96, 165, 250, 0.3);
  }

  .dark ${ContactCard}:hover & {
    box-shadow: 0 15px 40px rgba(96, 165, 250, 0.8),
                0 0 60px rgba(96, 165, 250, 0.5);
  }
`;

const ContactContent = styled.div`
  flex: 1;
`;

const ContactTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.6rem;
  background: linear-gradient(135deg, var(--accent-color), var(--primary-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  transition: all 0.3s ease;

  ${ContactCard}:hover & {
    transform: translateX(5px);
  }

  .dark & {
    background: linear-gradient(135deg, #93c5fd, #60a5fa);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    filter: drop-shadow(0 0 20px rgba(96, 165, 250, 0.3));
  }
`;

const ContactText = styled.p`
  font-size: 1.05rem;
  color: var(--text-secondary);
  line-height: 1.6;
  font-weight: 500;
  transition: all 0.3s ease;
  margin-bottom: 0.3rem;

  ${ContactCard}:hover & {
    color: var(--text-primary);
    transform: translateX(5px);
  }

  .dark & {
    color: #94a3b8;
  }

  .dark ${ContactCard}:hover & {
    color: #e2e8f0;
  }
`;

const ContactDescription = styled.p`
  font-size: 0.85rem;
  color: var(--text-secondary);
  opacity: 0.7;
  transition: all 0.3s ease;

  ${ContactCard}:hover & {
    opacity: 1;
    transform: translateX(5px);
  }

  .dark & {
    color: #64748b;
  }

  .dark ${ContactCard}:hover & {
    color: #94a3b8;
  }
`;

const SuccessMessage = styled(motion.div)`
  position: fixed;
  top: 2rem;
  right: 2rem;
  background: linear-gradient(90deg, var(--accent-color), var(--primary-color));
  color: white;
  padding: 1rem 2rem;
  border-radius: 0.75rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const LoadingOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
`;

const LoadingSpinner = styled(motion.div)`
  width: 50px;
  height: 50px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [state, handleSubmit] = useForm("mwpboogz", {
    data: {
      _replyto: "max30105@gmail.com",
      _subject: `[Contact Form] ${formData.subject}`,
      _cc: formData.email,
      _from: `${formData.name} <${formData.email}>`,
      _format: "html",
      _autoresponse: `안녕하세요 ${formData.name}님,\n\n문의해 주셔서 감사합니다. 곧 답변 드리도록 하겠습니다.\n\n감사합니다.`
    }
  });

  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (state.succeeded) {
      setShowSuccess(true);
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [state.succeeded]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const contactInfo = [
    {
      icon: '📧',
      title: '이메일',
      text: 'max30105@gmail.com',
      link: 'mailto:max30105@gmail.com',
      description: '언제든지 편하게 연락주세요'
    },
    {
      icon: '📱',
      title: '전화번호',
      text: '+82-10-7472-8983',
      link: 'tel:+82-10-7472-8983',
      description: '평일 오전 9시 ~ 오후 6시'
    },
    {
      icon: '💼',
      title: 'LinkedIn',
      text: 'Jaehyun Kim',
      link: 'https://www.linkedin.com/in/jaehyun-kim-b10bb1258/',
      description: '프로필 방문하기'
    },
    {
      icon: '💻',
      title: 'GitHub',
      text: '@H2aler',
      link: 'https://github.com/H2aler',
      description: '프로젝트 둘러보기'
    },
    {
      icon: '📍',
      title: '위치',
      text: '서울특별시, 대한민국',
      link: '#',
      description: '원격 근무 가능'
    },
    {
      icon: '⏰',
      title: '가용성',
      text: '즉시 가능',
      link: '#',
      description: '새로운 기회를 찾고 있습니다'
    }
  ];

  return (
    <ContactContainer>
      <ContentWrapper>
        <HeaderSection>
          <Title>Get In Touch</Title>
          <Subtitle>
            새로운 프로젝트나 협업 기회에 대해 이야기 나누고 싶습니다.
            <br />
            언제든지 편하게 연락주세요! 💬
          </Subtitle>
        </HeaderSection>
        <ContactForm
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          onSubmit={handleSubmit}
        >
          <FormGroup>
            <Label htmlFor="name">이름</Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="이름을 입력해주세요"
              disabled={state.submitting}
            />
            <ValidationError prefix="Name" field="name" errors={state.errors} />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="email">이메일</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="이메일을 입력해주세요"
              disabled={state.submitting}
            />
            <ValidationError prefix="Email" field="email" errors={state.errors} />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="subject">제목</Label>
            <Input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              placeholder="제목을 입력해주세요"
              disabled={state.submitting}
            />
            <ValidationError prefix="Subject" field="subject" errors={state.errors} />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="message">메시지</Label>
            <TextArea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="메시지를 입력해주세요"
              disabled={state.submitting}
            />
            <ValidationError prefix="Message" field="message" errors={state.errors} />
          </FormGroup>
          <SubmitButton
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={state.submitting}
          >
            {state.submitting ? (
              <>
                <span>전송 중</span>
                <span>⏳</span>
              </>
            ) : (
              <>
                <span>메시지 보내기</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </>
            )}
          </SubmitButton>
        </ContactForm>

        <ContactInfo
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {contactInfo.map((info, index) => (
            <ContactCard
              key={info.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href={info.link}
              target={info.link === '#' ? undefined : '_blank'}
              rel={info.link === '#' ? undefined : 'noopener noreferrer'}
            >
              <ContactIcon>{info.icon}</ContactIcon>
              <ContactContent>
                <ContactTitle>{info.title}</ContactTitle>
                <ContactText>{info.text}</ContactText>
                <ContactDescription>{info.description}</ContactDescription>
              </ContactContent>
            </ContactCard>
          ))}
        </ContactInfo>
      </ContentWrapper>

      <AnimatePresence>
        {showSuccess && (
          <SuccessMessage
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            메시지가 성공적으로 전송되었습니다! ✨
          </SuccessMessage>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {state.submitting && (
          <LoadingOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <LoadingSpinner />
          </LoadingOverlay>
        )}
      </AnimatePresence>
    </ContactContainer>
  );
};

export default Contact; 