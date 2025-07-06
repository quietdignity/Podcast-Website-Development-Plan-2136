import React, { useState, useRef } from 'react'
import SafeIcon from '../../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'

const { FiBold, FiItalic, FiList, FiLink, FiImage, FiEye } = FiIcons

const RichTextEditor = ({ value, onChange, placeholder = "Write your post..." }) => {
  const [isPreview, setIsPreview] = useState(false)
  const textareaRef = useRef(null)

  const insertFormatting = (before, after = '') => {
    const textarea = textareaRef.current
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = value.substring(start, end)
    
    const newValue = 
      value.substring(0, start) + 
      before + selectedText + after + 
      value.substring(end)
    
    onChange(newValue)
    
    // Reset cursor position
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(
        start + before.length,
        start + before.length + selectedText.length
      )
    }, 0)
  }

  const formatButtons = [
    { icon: FiBold, action: () => insertFormatting('**', '**'), title: 'Bold' },
    { icon: FiItalic, action: () => insertFormatting('*', '*'), title: 'Italic' },
    { icon: FiList, action: () => insertFormatting('\n- '), title: 'List' },
    { icon: FiLink, action: () => insertFormatting('[', '](url)'), title: 'Link' },
  ]

  const renderPreview = () => {
    // Simple markdown-like preview
    return value
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n- (.*)/g, '<li>$1</li>')
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>')
      .replace(/\n/g, '<br>')
  }

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="bg-gray-50 border-b border-gray-300 p-2 flex items-center space-x-2">
        {formatButtons.map((button, index) => (
          <button
            key={index}
            type="button"
            onClick={button.action}
            className="p-2 hover:bg-gray-200 rounded"
            title={button.title}
          >
            <SafeIcon icon={button.icon} className="w-4 h-4" />
          </button>
        ))}
        
        <div className="border-l border-gray-300 h-6 mx-2"></div>
        
        <button
          type="button"
          onClick={() => setIsPreview(!isPreview)}
          className={`p-2 rounded ${isPreview ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-200'}`}
          title="Preview"
        >
          <SafeIcon icon={FiEye} className="w-4 h-4" />
        </button>
      </div>

      {/* Editor/Preview */}
      <div className="relative">
        {isPreview ? (
          <div 
            className="p-4 min-h-64 prose max-w-none"
            dangerouslySetInnerHTML={{ __html: renderPreview() }}
          />
        ) : (
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full p-4 border-0 focus:ring-0 resize-none min-h-64 font-mono text-sm"
            style={{ minHeight: '16rem' }}
          />
        )}
      </div>
    </div>
  )
}

export default RichTextEditor