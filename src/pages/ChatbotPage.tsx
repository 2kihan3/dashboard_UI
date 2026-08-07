import { useMemo, useState } from 'react'
import {
  ArrowUpRight,
  ChevronRight,
  Clock,
  FileText,
  type LucideIcon,
  Paperclip,
  Pin,
  Plus,
  Scale,
  Send,
  Sparkles,
  Target,
  TrendingUp,
  X,
  ChevronsDown,
  ChevronsUp,
} from 'lucide-react'
import { chatSessions, currentSessionMessages, quickSkills, type ChatMessage } from '../data/chatbotMock'

const skillIconMap: Record<string, LucideIcon> = {
  FileText,
  Scale,
  TrendingUp,
  Link2: FileText, // 简化：使用相同图标
  Target,
  PackageCheck: FileText,
}

function MessageBubble({ message, onPreviewFile }: { message: ChatMessage; onPreviewFile: (file: NonNullable<ChatMessage['producedFile']>) => void }) {
  const isUser = message.role === 'user'
  const messageTime = isUser ? '14:01' : '14:03'
  return (
    <article className={`chat-msg chat-msg--${message.role}`}>
      <header className="chat-msg__role">
        {isUser ? (
          <>
            <time>{messageTime}</time>
            <span className="chat-msg__name">运营 · 我</span>
            <span className="chat-avatar chat-avatar--user">李</span>
          </>
        ) : (
          <>
            <span className="chat-avatar chat-avatar--assistant">经</span>
            <span className="chat-msg__name">经营引擎</span>
            <time>{messageTime}</time>
          </>
        )}
      </header>
      <div className="chat-msg__body">
        {message.content.split('\n').map((line, index) => <p key={index}>{line || '\u00A0'}</p>)}
      </div>
      {message.attachments?.length ? (
        <div className="chat-msg__attachments">
          {message.attachments.map((file) => (
            <span key={file.name} className="chat-attachment">
              <Paperclip aria-hidden="true" />
              <span>{file.name}</span>
              <small>{file.size}</small>
            </span>
          ))}
        </div>
      ) : null}
      {message.producedFile ? (
        <button type="button" className="chat-produced-link" onClick={() => onPreviewFile(message.producedFile!)}>
          <FileText aria-hidden="true" />
          <span>{message.producedFile.name}</span>
          <ChevronRight aria-hidden="true" />
        </button>
      ) : null}
    </article>
  )
}

function FilePreviewPanel({ file, onClose }: { file: NonNullable<ChatMessage['producedFile']>; onClose: () => void }) {
  return (
    <aside className="chat-preview-panel">
      <header>
        <div>
          <span className="eyebrow">file_preview</span>
          <h3>{file.name}</h3>
        </div>
        <button type="button" aria-label="关闭预览" onClick={onClose}><X aria-hidden="true" /></button>
      </header>
      <p className="chat-preview-desc">{file.description}</p>
      {file.rows?.length ? (
        <div className="chat-preview-rows">
          {file.rows.map((row) => (
            <div key={row.label} className={`chat-preview-row chat-preview-row--${row.tone ?? 'neutral'}`}>
              <span>{row.label}</span>
              <strong>{row.value}</strong>
            </div>
          ))}
        </div>
      ) : null}
      {file.bullets?.length ? (
        <ul className="chat-preview-bullets">
          {file.bullets.map((bullet, index) => <li key={index}><i />{bullet}</li>)}
        </ul>
      ) : null}
      <footer>
        <button type="button" className="secondary-action"><ArrowUpRight aria-hidden="true" />下载</button>
        <button type="button" className="primary-action"><Plus aria-hidden="true" />写入待办</button>
      </footer>
    </aside>
  )
}

export default function ChatbotPage() {
  const [activeSessionId, setActiveSessionId] = useState('s-1')
  const [previewFile, setPreviewFile] = useState<NonNullable<ChatMessage['producedFile']> | null>(null)
  const [input, setInput] = useState('')
  const [ruleTime, setRuleTime] = useState('yesterday')
  const [ruleScene, setRuleScene] = useState('daily_report')
  const [historyExpanded, setHistoryExpanded] = useState(false)
  const [skillMenuOpen, setSkillMenuOpen] = useState(false)
  const [selectedSkillId, setSelectedSkillId] = useState<string | null>(null)

  // 首屏保持当前会话的起始问答，后续追问仍作为原始会话数据保留。
  const messages = useMemo(() => currentSessionMessages.slice(0, 2), [])
  const previewableMessages = messages.filter((m) => m.producedFile)
  const selectedSkill = quickSkills.find((skill) => skill.id === selectedSkillId)

  return (
    <section className={`chatbot-page ${previewFile ? 'has-preview' : ''}`}>
      {/* 左栏：对话历史 */}
      <aside className="chatbot-rail">
        <div className="chatbot-rail__head">
          <button type="button" className="primary-action chatbot-new"><Plus aria-hidden="true" />新建对话</button>
        </div>
        <div className="chatbot-rail__section">
          <h4>对话历史</h4>
          <ul className="chat-history">
            {(historyExpanded ? chatSessions : chatSessions.slice(0, 5)).map((session) => (
              <li key={session.id}>
                <button
                  type="button"
                  className={`chat-history__item ${activeSessionId === session.id ? 'active' : ''}`}
                  onClick={() => setActiveSessionId(session.id)}
                >
                  <div className="chat-history__top">
                    <span className="chat-history__title">{session.title}</span>
                    {session.pinned ? <Pin aria-hidden="true" /> : null}
                  </div>
                  {activeSessionId === session.id ? <span className="chat-history__preview">{session.preview}</span> : null}
                  <time><Clock aria-hidden="true" />{session.updatedAt}</time>
                </button>
              </li>
            ))}
          </ul>
          {chatSessions.length > 5 ? (
            <button type="button" className="chat-history-toggle" onClick={() => setHistoryExpanded((v) => !v)}>
              {historyExpanded ? <><ChevronsUp aria-hidden="true" />收起</> : <><ChevronsDown aria-hidden="true" />展开全部（{chatSessions.length}）</>}
            </button>
          ) : null}
        </div>
      </aside>

      {/* 中栏：对话区 */}
      <section className="chatbot-main">
        <header className="chatbot-main__head">
          <div>
            <span className="eyebrow">operating_engine · chat</span>
            <h2>{chatSessions.find((s) => s.id === activeSessionId)?.title ?? '新对话'}</h2>
          </div>
          <div className="chatbot-main__actions">
            {previewableMessages.length ? (
              <button
                type="button"
                className={`secondary-action ${previewFile ? 'hidden-when-active' : ''}`}
                onClick={() => setPreviewFile(previewableMessages[0].producedFile ?? null)}
              >
                <FileText aria-hidden="true" />查看产出文件
              </button>
            ) : null}
          </div>
        </header>

        <div className="chatbot-thread">
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} onPreviewFile={setPreviewFile} />
          ))}
          <div className="chat-thread-hint">
            <Sparkles aria-hidden="true" />
            <span>经营引擎会基于已接入的平台与店铺数据生成结论；如需新数据源请在 skill 市场接入。</span>
          </div>
        </div>

        <form className="chatbot-composer" onSubmit={(event) => { event.preventDefault(); setInput('') }}>
          <div className="chatbot-composer__input-row">
            {selectedSkill ? <span className="chatbot-selected-skill"><Sparkles aria-hidden="true" />已选择：{selectedSkill.name}<button type="button" aria-label="移除已选技能" onClick={() => setSelectedSkillId(null)}><X aria-hidden="true" /></button></span> : null}
            <input
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="输入 / 触发技能"
            />
          </div>
          <div className="chatbot-composer__footer">
            <div className="chatbot-tool-picker">
              <button type="button" className="chatbot-tool-trigger" aria-label="添加工具" title="添加工具" aria-expanded={skillMenuOpen} onClick={() => setSkillMenuOpen((open) => !open)}><Plus aria-hidden="true" /></button>
              {skillMenuOpen ? <div className="chatbot-skill-menu" role="menu" aria-label="选择技能">{quickSkills.map((skill) => { const Icon = skillIconMap[skill.icon] ?? FileText; return <button key={skill.id} type="button" role="menuitem" className={selectedSkillId === skill.id ? 'active' : ''} onClick={() => { setSelectedSkillId(skill.id); setSkillMenuOpen(false) }}><span><Icon aria-hidden="true" /></span><div><strong>{skill.name}</strong><small>{skill.description}</small></div></button> })}</div> : null}
            </div>
            <label className="chatbot-composer__attach" aria-label="上传文件">
              <Paperclip aria-hidden="true" />
              <input type="file" hidden />
            </label>
            <div className="chatbot-rules" aria-label="任务规则">
              <label className="chatbot-rule">
                <span>时间</span>
                <select value={ruleTime} onChange={(event) => setRuleTime(event.target.value)}>
                  <option value="today">今天</option>
                  <option value="yesterday">昨天</option>
                  <option value="last7">近 7 天</option>
                  <option value="last30">近 30 天</option>
                  <option value="thisMonth">本月</option>
                  <option value="lastMonth">上月</option>
                </select>
              </label>
              <label className="chatbot-rule">
                <span>业务场景</span>
                <select value={ruleScene} onChange={(event) => setRuleScene(event.target.value)}>
                  <option value="daily_report">日报生成</option>
                  <option value="fee_audit">费用复核</option>
                  <option value="profit_analysis">利润分析</option>
                  <option value="promo_roi">推广 ROI</option>
                  <option value="inventory">库存预警</option>
                  <option value="refund">退款追溯</option>
                  <option value="free">自由问答</option>
                </select>
              </label>
            </div>
            <button type="submit" className="primary-action chatbot-send" aria-label="发送" disabled={!input.trim()}>
              <Send aria-hidden="true" />
            </button>
          </div>
        </form>
      </section>

      {/* 右栏：可隐藏的文件预览 */}
      {previewFile ? <FilePreviewPanel file={previewFile} onClose={() => setPreviewFile(null)} /> : null}
    </section>
  )
}
