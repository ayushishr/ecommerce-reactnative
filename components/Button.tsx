import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ActivityIndicator,
  ViewStyle,
  TextStyle
} from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  loading = false,
  disabled = false,
  style,
  textStyle,
  icon,
}) => {
  const getContainerStyles = () => {
    let containerStyles = [styles.button];
    
    // Variant
    if (variant === 'primary') containerStyles.push(styles.primaryButton);
    if (variant === 'secondary') containerStyles.push(styles.secondaryButton);
    if (variant === 'outline') containerStyles.push(styles.outlineButton);
    
    // Size
    if (size === 'small') containerStyles.push(styles.smallButton);
    if (size === 'large') containerStyles.push(styles.largeButton);
    
    // Width
    if (fullWidth) containerStyles.push(styles.fullWidth);
    
    // Disabled
    if (disabled) containerStyles.push(styles.disabledButton);
    
    return containerStyles;
  };
  
  const getTextStyles = () => {
    let textStyles = [styles.buttonText];
    
    // Variant
    if (variant === 'primary') textStyles.push(styles.primaryText);
    if (variant === 'secondary') textStyles.push(styles.secondaryText);
    if (variant === 'outline') textStyles.push(styles.outlineText);
    
    // Size
    if (size === 'small') textStyles.push(styles.smallText);
    if (size === 'large') textStyles.push(styles.largeText);
    
    // Disabled
    if (disabled) textStyles.push(styles.disabledText);
    
    return textStyles;
  };
  
  return (
    <TouchableOpacity
      style={[...getContainerStyles(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator 
          size="small" 
          color={variant === 'outline' ? '#3B82F6' : 'white'} 
        />
      ) : (
        <>
          {icon && icon}
          <Text style={[...getTextStyles(), textStyle, icon && styles.textWithIcon]}>
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  buttonText: {
    fontWeight: '600',
    textAlign: 'center',
  },
  // Variants
  primaryButton: {
    backgroundColor: '#3B82F6',
  },
  primaryText: {
    color: 'white',
  },
  secondaryButton: {
    backgroundColor: '#F3F4F6',
  },
  secondaryText: {
    color: '#1F2937',
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#3B82F6',
  },
  outlineText: {
    color: '#3B82F6',
  },
  // Sizes
  smallButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  smallText: {
    fontSize: 14,
  },
  largeButton: {
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  largeText: {
    fontSize: 18,
  },
  // Width
  fullWidth: {
    width: '100%',
  },
  // States
  disabledButton: {
    opacity: 0.5,
  },
  disabledText: {
    opacity: 0.8,
  },
  // Icon
  textWithIcon: {
    marginLeft: 8,
  },
});